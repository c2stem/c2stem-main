#!/usr/bin/env node

var program = require('commander');

function start(options) {
    if (options.verbose) {
        console.log("Debugging of snap-cloud is enabled");
        process.env['DEBUG'] += ',snap-cloud';
    }

    var express = require('express'),
        snapCloud = require('./snap-cloud/snap-cloud'),
        MongoClient = require('mongodb').MongoClient;

    MongoClient.connect('mongodb:' + options.mongo, function (err, db) {
        if (err) {
            console.log('Could not connect to MongoDB at ' + options.mongo, err);
        } else {
            console.log('Connected to MongoDB at ' + options.mongo);

            var app = express();

            // Handle snap cloud requests
            app.use('/SnapCloud', snapCloud({
                session_secret: 'SnapCloud',
                cookie_secure: false,
                mongodb: db,
                mailer_from: 'no-reply@c2stem.org',
                mailer_smpt: undefined
            }));

            app.use('/SnapPhysics', express.static(__dirname + '/snap-physics/'));
            app.use(express.static(__dirname + '/html/'));

            // Start the server
            options.port = +options.port || 8080;
            app.listen(options.port, function () {
                console.log('Listening on port ' + options.port);
            });
        }
    });
}

program.version('1.0.2')
    .option('-m, --mongo <uri>', 'sets MongoDB URI [//localhost/c2stem-main]', '//localhost/c2stem-main')
    .option('-v, --verbose', 'enable logging of snap-cloud')
    .option('-p, --port <n>', 'port number to use [9090]', 9090)
    .action(start)
    .parse(process.argv);

start(program);
