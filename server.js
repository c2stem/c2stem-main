#!/usr/bin/env node

var program = require('commander'),
    version = require('./package.json').version;

function start(options) {
    if (options.verbose) {
        console.log("Debugging of snap-cloud is enabled");
        process.env['DEBUG'] += ',snap-cloud';
    }

    var express = require('express'),
        bodyParser = require('body-parser'),
        snapCloud = require('./snap-cloud/snap-cloud'),
        MongoClient = require('mongodb').MongoClient;

    MongoClient.connect('mongodb:' + options.mongo, function (err, db) {
        if (err) {
            console.log('Could not connect to MongoDB at ' + options.mongo, err);
        } else {
            console.log('Connected to MongoDB at ' + options.mongo);

            var app = express();

            // Handle snap cloud requests
            var snapRouter = snapCloud({
                session_secret: 'SnapCloud',
                cookie_secure: false,
                mongodb: db,
                mailer_from: 'no-reply@c2stem.org',
                mailer_smpt: undefined,
                public_page_title: process.env.PROJECT_INDEX_NAME || 'Public C2Stem Projects',
                default_origin: 'http://run.c2stem.org'
            });
            var projects = db.collection('projects');
            var user_roles = db.collection('user-roles');
            var users = db.collection('users');
            init_c2stem_server(snapRouter, projects, user_roles, users);

            app.use('/SnapCloud', snapRouter);

            app.use('/SnapPhysics', express.static(__dirname + '/snap-physics/'));
            app.use(express.static(__dirname + '/html/'));
            app.use(bodyParser.json());

            // event logging endpoint
            var events = db.collection('event-logs');
            snapRouter.post('/events/record', function (req, res) {
                const event = req.body;
                const username = req.session.user;

                event.username = username;

                console.log('received event:', event);
                return events.save(event)
                    .then(() => res.sendStatus(200));
            });

            // Start the server
            options.port = +options.port || 8080;
            app.listen(options.port, function () {
                console.log('Listening on port ' + options.port);
            });
        }
    });
}

function debug(text) {
    // console.log(text);
}
function init_c2stem_server(router, projects, user_roles, users) {

    router.addSnapApi('saveUserProgress', ['ProjectName', 'UserTaskData'], 'Post', function (req, res) {
        var userName = req.session.user,
            projectName = req.body.ProjectName,
            userTaskData = req.body.UserTaskData;
        debug('Save project', userName, projectName);

        if (typeof userName !== 'string' ||
            typeof projectName !== 'string' ||
            typeof userTaskData !== 'string') {
            sendSnapError(res, 'Invalid request');
        } else {
            var fields = {
                updated: new Date(),
                userTaskData: userTaskData,
                origin: req.get('origin') || options.default_origin
            };

            projects.update({
                user: userName,
                name: projectName
            }, {
                $set: fields,
                $setOnInsert: {
                    public: false
                }
            }, {
                upsert: true,
                multi: false
            }, function (err) {
                if (err) {
                    sendSnapError(res, 'Database error');
                } else {
                    res.sendStatus(200);
                    debug('project saved', userName, projectName);
                }
            });
        }
    });

    function sendSnapError(res, text) {
        text = 'ERROR: ' + text;
        debug(text);
        res.status(400).send(text);
    }
    router.get('/getUserProgress', function rawPublic(req, res) {
        var userName = req.query.Username,
            projectName = req.query.ProjectName,
            template = req.query.Template;

        var sessionUserName = req.session.user;
        debug('Load public', userName, projectName, template);
        debug('sessionUserName', sessionUserName);

        if (typeof userName !== 'string' ||
            typeof projectName !== 'string') {
            sendSnapError(res, 'Invalid request');
        } else {
            debug('Trying to load user version of the project');
            projects.findOne({
                user: { // HACK: username is sent in lowercase
                    $regex: new RegExp('^' + sessionUserName + '$', 'i')
                },
                name: projectName
            }, function (err, doc) {
                if (err || !doc) {
                    console.log(err, doc);
                    debug('User project not found for user:', sessionUserName);
                    debug('So loading template project');
                    projects.findOne({
                        user: { // HACK: username is sent in lowercase
                            $regex: new RegExp('^' + userName + '$', 'i')
                        },
                        name: template,
                        public: true
                    }, function (err, doc) {
                        if (err || !doc) {
                            console.log(err, doc);
                            sendSnapError(res, 'Project not found');
                        } else {
                            debug('Template Project found');
                            var userProgress = {};
                            userProgress[template] = doc.snapdata;
                            userProgress = JSON.stringify(userProgress);
                            res.send(userProgress);
                        }
                    });
                } else {
                    debug('user version of the project loaded');
                    var userProgress = doc.userTaskData;
                    res.send(userProgress);
                }
            });
        }
    });

    router.get('/getUserRole', function rawPublic(req, res) {
        var sessionUserName = req.session.user;
        debug('sessionUserName', sessionUserName);

        if (typeof sessionUserName !== 'string') {
            sendSnapError(res, 'No session inititated');
        } else {
            debug('Trying to load user role');
            // db structure:
            // user: {role: student, study: name-of-the-study}
            user_roles.findOne({
                user_id: sessionUserName
            },{role:1, study:1}, function (err, doc) {
                if (err || !doc) {
                    console.log(err, doc);
                    sendSnapError(res, 'User role not found');
                } else {
                    debug('User role found');
                    res.send(JSON.stringify(doc));
                }
            });
        }
    });


    router.get('/getUserList', function rawPublic(req, res) {
        var study = req.query.study;
        var role = req.query.role;
        users.find({study:study, role:role},{_id:1}).toArray(function (err, doc) {
            if (err || !doc) {
                console.log(err, doc);
                sendSnapError(res, 'No users found');
            } else {
                res.send(JSON.stringify(doc));
            }
        });
    });
};

program.version(version)
    .option('-m, --mongo <uri>', 'sets MongoDB URI [//localhost/c2stem-main]', '//localhost/c2stem-main')
    .option('-v, --verbose', 'enable logging of snap-cloud')
    .option('-p, --port <n>', 'port number to use [9090]', 9090)
    .action(start)
    .parse(process.argv);

start(program);


function debug() {
    console.log.apply(this, arguments);
}