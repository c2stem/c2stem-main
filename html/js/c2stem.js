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
                id: 't1',
                name: 'Back to the Basics'
            }, {
                id: 't2',
                name: 'Challenge problem'
            }, {
                id: 't4',
                name: 'Conceptual Modeling'
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

    if (id === 't1') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Back to the Basics',
            tabs: [{
                id: 'b1',
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
                <p>
                    Part A. Write a program that asks the user for x coordinate when the Green Flag 
                    is clicked and places the sprite at that location.
                    <br/>Part B. Without using loops, make the sprite move 1 m/s to the right.
                </p>
                `
            }, {
                id: 'b2',
                type: 'snap1',
                name: 'Part A'
            }, {
                id: 'b3',
                type: 'snap1',
                name: 'Part B'
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
    } else if (id === 't4') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Conceptual Modeling Demo',
            tabs: [{
                id: 'b6',
                type: 'desc',
                name: 'Description',
                markup: `
                <p>
                    Conceptual modeling task description goes here.
                </p>
                `
            }, {
                id: 'cm',
                type: 'cm',
                name: 'Conceptual'
            }, {
                id: 'b8',
                type: 'snap2',
                name: 'Computational'
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

C2Stem.prototype.addSnap1Tab = function (id, name, markup) {
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
    });

    $(snapWindow).on('beforeunload', function () {
        C2StemActions.unregister('snap' + id);
    });
}

C2Stem.prototype.addSnap2Tab = function (id, name, markup) {
    $("#tabs-div ul").append(`<li class="tab"><a href="#tab${id}">${name}</a></li>`)
    $("body").append(`
        <div class="c2stem-snap2" id="tab${id}">
            <canvas></canvas>
        </div>`);

    $(document).ready(function () {
        console.log('ready');

        var canvas = $(`#tab${id} > canvas`).get(0);
        var world = new WorldMorph(canvas, false);
        window.snap = {};
        snap.world = world;

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
        // world.updateSize();

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
};

C2Stem.prototype.addConcpetualModelingTab = function (id, name, markup) {
    $("#tabs-div ul").append(`<li class="tab"><a href="#tab${id}">${name}</a></li>`);
    // $("#tabs").append(`<li class="tab"><a href="#tab${id}">${name}</a></li>`);
    $("body").append(`
        <div class="c2stem-cm" id="tab${id}">
            <canvas></canvas>
        </div>`);
    load_components();
};