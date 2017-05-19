function C2Stem(snapCloudUrl) {
    this.snapCloudUrl = snapCloudUrl || "";
    this.withCredentials = false;
    this.query = this.parseQueryString();
};

C2Stem.prototype.login = function (username, password, remember, callback) {
    try {
        var req = new XMLHttpRequest();
        req.open('POST', this.snapCloudUrl + "/SnapCloud/", true);
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.withCredentials = this.withCredentials;
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    callback(null);
                } else {
                    callback(req.responseText || 'Connection refused');
                }
            }
        };
        req.send(JSON.stringify({
            '__h': password && hex_sha512(password),
            '__u': username,
            'remember': remember === true,
        }));
    } catch (err) {
        callback(err || "Could not login");
    }
};

C2Stem.prototype.logout = function (callback) {
    try {
        var req = new XMLHttpRequest();
        req.open('GET', this.snapCloudUrl + "/SnapCloud/logout", true);
        req.withCredentials = this.withCredentials;
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    callback(null);
                } else {
                    callback(req.responseText || 'Connection refused');
                }
            }
        };
        req.send();
    } catch (err) {
        callback(err || "Could not logout");
    }
};

C2Stem.prototype.signup = function (username, email, callback) {
    try {
        var req = new XMLHttpRequest();
        req.open('GET', this.snapCloudUrl + "/SnapCloud/SignUp" +
            '?Username=' + encodeURIComponent(username) +
            '&Email=' + encodeURIComponent(email), true);
        req.withCredentials = this.withCredentials;
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    callback(null);
                } else {
                    callback(req.responseText || 'Connection refused');
                }
            }
        };
        req.send();
    } catch (err) {
        callback(err || "Could not register");
    }
};

C2Stem.prototype.parseQueryString = function () {
    var s = window.location.search,
        q = {};

    if (s.length >= 2) {
        s = s.substr(1).split('&');
        for (var i = 0; i < s.length; i++) {
            var b = s[i].split('=');
            q[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
    }

    return q;
}

C2Stem.prototype.loadHomeData = function (callback) {
    var res = {
        modules: [{
            id: '1dmotion',
            name: "1D motion",
            icon: "img/school-bus.png"
        }, {
            id: 'm2',
            name: "Relative motion",
            icon: "img/boat.png"
        }, {
            id: 'm3',
            name: "Gravity",
            icon: "img/plane.png"
        }, {
            id: 'm4',
            name: "Rocket landing",
            icon: "img/falcon9.png"
        }, {
            id: 'devmod',
            name: "Development",
            icon: "img/work-in-prog.png"
        }]
    };

    // hack, to make sure that we are logged in
    this.login(null, null, null, function (err) {
        callback(err, err ? null : res);
    });
}

C2Stem.prototype.loadModuleData = function (id, callback) {
    var res;

    if (id === '1dmotion') {
        res = {
            id: id,
            name: '1D motion',
            tasks: [{
                id: '1d-basics',
                name: 'Back to the Basics'
            }, {
                id: '1d-loops',
                name: 'Getting Back in the Loop'
            }, {
                id: '1d-steps',
                name: 'One, Two, Step'
            }, {
                id: '1d-simple',
                name: 'Start and Stop'
            }]
        };
    } else if (id === 'devmod') {
        res = {
            id: id,
            name: 'Development',
            tasks: [{
                id: 'snaptest',
                name: 'How to embed SNAP'
            }]
        };
    } else {
        res = {
            id: 'unknown',
            name: 'Unknown module',
            tasks: []
        }
    }

    // hack, to make sure that we are logged in
    this.login(null, null, null, function (err) {
        callback(err, err ? null : res);
    });
}

C2Stem.prototype.loadTaskData = function (id, callback) {
    var res;

    if (id === '1d-basics') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Basics',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                <blockquote>
                    Get the fundamentals down and the level of everything you do will rise.
                    <cite>Michael Jordan</cite>
                </blockquote>
                <p>
                    Before we dive into the physics challenges, we are going to practice 
                    using the physics blocks in our program. By the end of this task,
                    you should have an understanding of the following Knowledge Goals:
                    <ul>
                        <li>The Coordinate System</li>
                        <li>Defining Variables and Assigning Values</li>
                        <li>Updating Position</li>
                        <li>Input and Output Abilities</li>
                        <li>C2STEM Operators and Expressions</li>
                        <li>A Basic Algorithm Structure</li>
                    </ul>
                </p>
                <img src="img/turtle.jpg" alt="turtle" width="10%"/>
                <p>
                    Part A. Write a program that asks the user for x coordinate when the Green Flag 
                    is clicked and places the sprite at that location.
                    <br/>Part B. Without using loops, make the sprite move 1 m/s to the right.
                </p>
                `
            }, {
                id: 'parta',
                type: 'snap1',
                name: 'Part A'
            }, {
                id: 'partb',
                type: 'snap1',
                name: 'Part B'
            }]
        };
    } else if (id === '1d-loops') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Loops',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                <p>
                    Position is a critical component to our understanding of kinematics topics such as
                    acceleration, velocity, and speed. In the previous task, we manually moved the sprite
                    to the right. But we aren’t manually moving a vehicle meter by meter - so it seems
                    quite tedious to do that in a computer simulation! You may have experienced using 
                    programming loops in previous classes or with other programming environments 
                    (NetsBlox, Scratch, etc.). In this task, we will be implementing such loops with
                    our physics blocks in order to more accurately simulate kinematics motion.
                    <br/><br/>Knowledge Goals for This Task Include:
                    <ul>
                        <li>Initializing Variables</li>
                        <li>Iteration (the act of repeating a process)</li>
                        <li>Conditionals (e.g. completing an action until the event reaches a certain stage)</li>
                        <li>Physics Base-Change: x_k+1 = x_k + Δx</li>
                        <li>Δt</li>
                        <li>position-velocity- time: Δx = vΔt</li>
                        <li>Mathematical relationships</li>
                        <li>Operators and expressions</li>
                        <li>Input and output</li>
                        <li>Conditionals</li>
                        <li>Debugging and test cases</li>
                    </ul>
                </p>
                <p>
                    Part A. Take your final code from Task One and elaborate the program to simulate
                        the motion of the sprite at 1 m/s to the right from coordinate 0 to coordinate 10.
                    <br/>Part B. This time, use a smaller time step and allow the user of your program to 
                        specify the length of the time step. This process can be similar to how you 
                        requested information for position in Task One.
                    <br/>Part C. Finally, let’s give the user more options. Allow user to specify additional 
                        motion variables such as velocity, starting point, and ending point of the simulation.
                </p>
                `
            }, {
                id: 'parta',
                type: 'snap1',
                name: 'Part A'
            }, {
                id: 'partb',
                type: 'snap1',
                name: 'Part B'
            }, {
                id: 'partc',
                type: 'snap1',
                name: 'Part C'
            }]
        };
    } else if (id === '1d-steps') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Steps',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                <p>
                    So far, all of our actions happen as soon as the green flag is clicked. As a means
                    of adding more structure to the program, let’s create a simulation step. To do so, 
                    initial variable creation will still happen at the green flag (such as asking the
                    user for input and setting the respective variable to the submitted answer), but the
                    simulation actions will take place in a simulation step that is called once all
                    variables are initialized.
                    <br/><br/>Knowledge Goals for This Task:
                    <ul>
                        <li>Utilizing a simulation step</li>
                    </ul>
                </p>
                <p>
                    Part A. Use your code from Part C in Task Two and add the simulation step by separating
                    the loop component from the main block of code and setting it to begin at “simulation step.”
                    Keep in mind that the simulation step will only run when it is called, so you must
                    include the appropriate call to the block of code that occurs when the green flag is clicked.
                </p>
                `
            }, {
                id: 'parta',
                type: 'snap1',
                name: 'Part A'
            }]
        };
    } else if (id === '1d-simple') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Start and Stop',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<p>Speed up and stop at the stop sign.</p>'
            }, {
                id: 'parta',
                type: 'snap1',
                name: 'Part A',
                template: {
                    user: 'Miklos',
                    proj: 'simple'
                }
            }]
        };
    } else if (id === 'snaptest') {
        res = {
            parent: {
                id: 'devmod',
                name: 'Development'
            },
            id: id,
            name: 'SNAP embedding',
            tabs: [{
                id: 'b4',
                type: 'snap1',
                name: 'Snap 1'
            }, {
                id: 'b5',
                type: 'snap2',
                name: 'Snap 2'
            }]
        };
    } else {
        res = {
            parent: {
                id: 'unknown',
                name: 'Unknown module'
            },
            id: 'unknown',
            name: 'Unknown task',
            tabs: []
        }
    }

    // hack, to make sure that we are logged in
    this.login(null, null, null, function (err) {
        callback(err, err ? null : res);
    });
}

C2Stem.prototype.fixupLogoutLink = function () {
    $("#logout").click(function (event) {
        event.preventDefault();
        c2stem.logout(function (err) {
            window.location.href = "login.html";
        });
    });
}

C2Stem.prototype.fixupModuleLink = function (id, name) {
    $("#modulelink").attr('href', "module.html?" + $.param({
        id: id,
    })).text(name);
}

C2Stem.prototype.fixupTaskLink = function (id, name) {
    $("#tasklink").attr('href', "task.html?" + $.param({
        id: id,
    })).text(name);
}

C2Stem.prototype.addDescriptionTab = function (id, name, markup) {
    $("#tabs-div ul").append(`<li class="tab"><a href="#tab${id}">${name}</a></li>`)
    $("body").append(`<div class="c2stem-desc" id="tab${id}">${markup}</div>`);
}

C2Stem.prototype.addSnap1Tab = function (id, name, template) {
    var c2stem = this;

    $("#tabs-div ul").append(`<li class="tab"><a href="#tab${id}">${name}</a></li>`)
    $("body").append(`
        <div class="c2stem-snap1" id="tab${id}">
            <iframe src="mysnap.html"></iframe>
        </div>`);

    var snapWindow = $(`#tab${id} > iframe`).get(0);
    snapWindow = snapWindow.contentWindow || snapWindow.contentDocument.defaultView;
    $(snapWindow).on('load', function () {
        // Register the computational action manager
        C2StemActions.register('snap' + id, snapWindow.SnapActions);

        // Configure SnapActions to route everything through the global manager
        C2StemActions.applyEvent = function (event) {
            if (!event.namespace) { // route all internal events through C2StemActions
                event.namespace = SNAP_ID;
                return C2StemActions.applyEvent(event);
            } else {
                return snapWindow.ActionManager.prototype.applyEvent.call(this, event);
            }
        };

        // this is really a hack, but how to get hold of the IDE?
        snapWindow.loadMyProject = function (ide) {
            c2stem.loadPublicProject(snapWindow, ide, template)
        }
    });

    $(snapWindow).on('beforeunload', function () {
        C2StemActions.unregister('snap' + id);
    });
}

C2Stem.prototype.addSnap2Tab = function (id, name, template) {
    var c2stem = this;

    $("#tabs-div ul").append(`<li class="tab"><a href="#tab${id}">${name}</a></li>`)
    $("body").append(`
        <div class="c2stem-snap2" id="tab${id}">
            <canvas></canvas>
        </div>`);

    $(document).ready(function () {
        console.log('ready');

        var canvas = $(`#tab${id} > canvas`).get(0);
        var world = new WorldMorph(canvas, false);

        window.addEventListener(
            "resize",
            function () {
                world.updateSize();
            },
            false
        );

        world.worldCanvas.focus();

        var ide = new IDE_Morph();
        ide.openIn(world);
        c2stem.loadPublicProject(window, ide, template)

        // Resize on tab change ('display' attr set to 'none')
        var detectTabShown = new MutationObserver(function () {
            world.updateSize();
        });
        detectTabShown.observe($(`#tab${id}`).get(0), {
            attributes: true
        });

        function loop() {
            requestAnimationFrame(loop);
            world.doOneCycle();
        }
        loop();
    });
}

C2Stem.prototype.loadPublicProject = function (snapWin, snapIde, template) {
    if (!template || !snapWin.SnapCloud) {
        return;
    }

    console.log('loading template', template);
    var cloud = snapWin.SnapCloud;
    cloud.getPublicProject(cloud.encodeDict({
        Username: template.user,
        ProjectName: template.proj
    }), function (projectData) {
        if (projectData.indexOf('<snapdata') === 0) {
            snapIde.rawOpenCloudDataString(projectData);
        } else {
            console.log('INVALID', projectData)
        }
    }, function (err) {
        console.log('ERROR: ' + err);
    });
}