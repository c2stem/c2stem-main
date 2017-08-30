#!/usr/bin/env node

var program = require('commander'),
    mailer = require('./snap-cloud/src/mailer'),
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

    // TODO: Disable caching
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
            var users = db.collection('users');
            var studentStatus = db.collection('student-status');
            init_c2stem_server(snapRouter, projects, users, studentStatus);

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

                console.log('received event:', event.namespace);
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
function init_c2stem_server(router, projects, users, studentStatus) {

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

    // Automatic bug reporting
    var MAINTAINER_EMAIL = process.env.MAINTAINER_EMAIL;
    if (MAINTAINER_EMAIL) console.log('Bugs will be reported to', MAINTAINER_EMAIL);

    router.post('/BugReport', function reportBug(req, res) {
        console.log('received bug', req.body);
        var report = req.body;

        // Add the timestamp
        report.timestamp = new Date();
        report.username = req.session.user;

        // Email the bug report
        if (MAINTAINER_EMAIL) {
            var subject = 'Auto Bug Report';
            var body = JSON.stringify(report, null, 2);
            mailer.sendEmail(MAINTAINER_EMAIL, subject, body);
        } else {
            console.error('No MAINTAINER_EMAIL set. Skipping bug report email');
        }
    });

    router.get('/getUserProgress', function rawPublic(req, res) {
        var userName = req.query.Username,
            projectName = req.query.ProjectName,
            template = req.query.Template,
            mode = req.query.mode;

        var sessionUserName = req.session.user;
        if(mode !== null && mode === 'teacher')
            sessionUserName = userName;
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
            users.findOne({
                _id: sessionUserName
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


    router.get('/getStudentStatus', function rawPublic(req, res) {
        var study = req.query.study;
        studentStatus.find({study:study}).toArray(function (err, doc) {
            if (err || !doc) {
                console.log(err, doc);
                sendSnapError(res, 'No student records found');
            } else {
                res.send(JSON.stringify(doc));
            }
        });
    });

    router.get('/isNewTask', function rawPublic(req, res) {
        var userName = req.session.user,
            study = req.query.study,
            taskID = req.query.taskID;
        studentStatus.findOne({study:study, user: userName}, function (err, doc) {
            if (err || !doc) {
                console.log(err, doc);
                res.send(JSON.stringify({isNew:true}));
            } else {
                if("tasks" in doc){
                    if (taskID in doc.tasks){
                        res.send(JSON.stringify({isNew:false}));
                        console.log("NEW TASK FALSE");
                        return;
                    }
                }
                console.log("NEW TASK TRUE");
                res.send(JSON.stringify({isNew:true}));
            }
        });
    });


    router.addSnapApi('recordTaskModified', ['taskID','study'], 'Post', function (req, res) {
        var userName = req.session.user,
            taskID = req.body.taskID,
            study = req.body.study;
        debug('update student status, record task modified', userName, taskID);

        if (typeof userName !== 'string' ||
            typeof taskID !== 'string' ||
            typeof study !== 'string') {
            sendSnapError(res, 'Invalid request');
        } else {
            studentStatus.findOne({user: userName, study:study}, function (err, doc) {
                if(!("tasks" in doc))
                    doc.tasks = {};
                doc.tasks[taskID] = { id: taskID, submitted:{}};
                studentStatus.update({
                    user: userName,
                    study: study
                }, {
                    $set: doc
                }, {
                    upsert: true,
                    multi: false
                }, function (err) {
                    if (err) {
                        sendSnapError(res, 'Database error');
                    } else {
                        res.sendStatus(200);
                        debug('Student status updated, record task submitted', userName, taskID);
                    }
                });
            });
        }
    });

    router.addSnapApi('recordTaskSubmitted', ['activityID','taskID', 'study'], 'Post', function (req, res) {
        var userName = req.session.user,
            activityID = req.body.activityID,
            taskID = req.body.taskID,
            study = req.body.study;
        debug('update student status, record task submitted', userName, taskID);

        if (typeof userName !== 'string' ||
            typeof activityID !== 'string' ||
            typeof taskID !== 'string' ||
            typeof study !== 'string') {
            sendSnapError(res, 'Invalid request');
        } else {
            studentStatus.findOne({user: userName, study: study}, function (err, doc) {
                console.log("student status:", doc);

                if(!(activityID in doc.tasks[taskID].submitted)){
                    doc.tasks[taskID].submitted[activityID] = [Date.now()];
                }else{
                    if(doc.tasks[taskID].submitted[activityID].constructor === Array){
                        doc.tasks[taskID].submitted[activityID].push(Date.now());
                    }else{
                        doc.tasks[taskID].submitted[activityID] = [doc.tasks[taskID].submitted[activityID], Date.now()];
                    }
                }

                studentStatus.update({
                    user: userName,
                    study: study
                }, {
                    $set: doc
                }, {
                    upsert: true,
                    multi: false
                }, function (err) {
                    if (err) {
                        sendSnapError(res, 'Database error');
                    } else {
                        res.sendStatus(200);
                        debug('Student status updated, record task submitted', userName, taskID);
                    }
                });
            });

            // var fields = {
            //     tasks: {
            //     }
            // };
            // fields.tasks[taskID] = { };
            // fields.tasks[taskID].submitted = { };
            // fields.tasks[taskID].submitted[activityID] = Date.now();
            // studentStatus.update({
            //     user: userName
            // }, {
            //     $set: fields
            // }, {
            //     upsert: true,
            //     multi: false
            // }, function (err) {
            //     if (err) {
            //         sendSnapError(res, 'Database error');
            //     } else {
            //         res.sendStatus(200);
            //         debug('Student status updated, record task submitted', userName, taskID);
            //     }
            // });
        }
    });

    router.addSnapApi('recordCurrentTask', ['taskID', 'study'], 'Post', function (req, res) {
        var userName = req.session.user,
            taskID = req.body.taskID,
            study = req.body.study;
        debug('update student status, record current task', userName, taskID, study);

        if (typeof userName !== 'string' ||
            typeof taskID !== 'string' ||
            typeof study !== 'string') {
            sendSnapError(res, 'Invalid request');
        } else {
            studentStatus.update({
                user: userName,
                study: study
            }, {
                $set: {currentTask:taskID}
            }, {
                upsert: true,
                multi: false
            }, function (err) {
                if (err) {
                    sendSnapError(res, 'Database error');
                } else {
                    res.sendStatus(200);
                    debug('Student status updated, record task modified', userName, taskID);
                }
            });
        }
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
