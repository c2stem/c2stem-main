window.snap = {}

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
        snapWindow.SnapActions.applyEvent = function (event) {
            if (!event.namespace) { // route all internal events through C2StemActions
                event.namespace = SNAP_ID;
                return C2StemActions.applyEvent(event);
            } else {
                return snapWindow.ActionManager.prototype.applyEvent.call(this, event);
            }
        };

        // this is really a hack, but how to get hold of the IDE?
        snapWindow.loadMyProject = function (ide, callback) {
            window.snap.world = ide.parent;
            c2stem.loadPublicProject(snapWindow, ide, template, function (err) {
                if (window.snap.callme) {
                    window.snap.callme();
                }
                callback(err);
            });
        }
    });

    $(snapWindow).on('beforeunload', function () {
        C2StemActions.unregister('snap' + id);
    });
};

C2Stem.prototype.addSnap2Tab = function (id, name, template) {
    var c2stem = this;

    $("#tabs-div ul").append(`<li class="tab"><a href="#tab${id}">${name}</a></li>`)
    $("body").append(`
        <div class="c2stem-snap2" id="tab${id}">
            <canvas></canvas>
        </div>`);

    $(document).ready(function () {
        if (typeof WorldMorph === "undefined") {
            console.log('Snap is not loaded');
        } else {
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
            c2stem.loadPublicProject(window, ide, template, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    function loop() {
                        requestAnimationFrame(loop);
                        world.doOneCycle();
                    }
                    loop();
                }
            });

            // Resize on tab change ('display' attr set to 'none')
            var detectTabShown = new MutationObserver(function () {
                world.updateSize();
            });
            detectTabShown.observe($(`#tab${id}`).get(0), {
                attributes: true
            });
        }
    });
};

C2Stem.prototype.addConcpetualModelingTab = function (id, name, data) {
    $("#tabs-div ul").append(`<li class="tab"><a href="#tab${id}">${name}</a></li>`);
    $("body").append(`
        <div class="c2stem-cm" id="tab${id}">
        </div>`);

    window.snap.callme = function () {
        load_conceptual_model(`tab${id}`, data);
    }
};

C2Stem.prototype.loadPublicProject = function (snapWin, snapIde, template, callback) {
    if (!snapWin.SnapCloud) {
        callback('snapcloud is not registered');
    } else if (!template) {
        callback('missing template');
    } else {
        console.log('loading template', template);
        var cloud = snapWin.SnapCloud;
        cloud.getPublicProject(cloud.encodeDict({
            Username: template.user,
            ProjectName: template.proj
        }), function (projectData) {
            if (projectData.indexOf('<snapdata') === 0) {
                snapIde.rawOpenCloudDataString(projectData);
                callback(null);
            } else {
                callback('Invalid project');
            }
        }, function (err) {
            callback('ERROR: ' + err);
        });
    }
};
