window.snap = {}

function C2Stem(snapCloudUrl) {
    this.snapCloudUrl = snapCloudUrl || "";
    this.withCredentials = false;
    this.query = this.parseQueryString();
};



C2Stem.prototype.parseAPI = function (src) {
    var api = {},
        services;
    services = src.split(" ");
    services.forEach(function (service) {
        var entries = service.split("&"),
            serviceDescription = {},
            parms;
        entries.forEach(function (entry) {
            var pair = entry.split("="),
                key = decodeURIComponent(pair[0]).toLowerCase(),
                val = decodeURIComponent(pair[1]);
            if (key === "service") {
                api[val] = serviceDescription;
            } else if (key === "parameters") {
                parms = val.split(",");
                if (!(parms.length === 1 && !parms[0])) {
                    serviceDescription.parameters = parms;
                }
            } else {
                serviceDescription[key] = val;
            }
        });
    });
    return api;
};

C2Stem.prototype.login = function (username, password, remember, callback) {
    var myself = this;
    try {
        var req = new XMLHttpRequest();
        req.open('POST', this.snapCloudUrl + "/SnapCloud/", true);
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.withCredentials = this.withCredentials;
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    myself.api = myself.parseAPI(req.responseText);
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

C2Stem.prototype.addDescriptionTab = function (id, name, markup, callbackOnLoad) {
    $("body").append(`<div class="c2stem-desc" id="tab${id}">${markup}</div>`);
}

C2Stem.prototype.addSnap1Tab = function (id, name, template, callbackOnLoad) {
    var c2stem = this;
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
        // snapWindow.SnapActions.applyEvent = function (event) {
        //     if (!event.namespace) { // route all internal events through C2StemActions
        //         event.namespace = SNAP_ID;
        //         return C2StemActions.applyEvent(event);
        //     } else {
        //         return snapWindow.ActionManager.prototype.applyEvent.call(this, event);
        //     }
        // };

        c2stem.snapWin = snapWindow;

        // this is really a hack, but how to get hold of the IDE?
        snapWindow.loadMyProject = function (ide, callback) {
            registerSaveDataFetcherForSnap(ide, template.proj);
            window.snap.world = ide.parent;
            var snapData =  c2stem.userTaskData[template.proj];
            if(snapData == undefined){
                console.log("Loading snap project from template");
                c2stem.loadPublicProject(c2stem.task_id, template, true, function (err) {
                    snapData = c2stem.userTaskData[template.proj];
                    on_snap_project_loading_done(ide, snapData, callback);
                });
            }
            else{
                on_snap_project_loading_done(ide, snapData, callback);
            }
        };
    });

    $(snapWindow).on('beforeunload', function () {
        C2StemActions.unregister('snap' + id);
    });
};

function on_snap_project_loading_done(ide, snapData, callback) {
    if (snapData != undefined && snapData.indexOf('<snapdata') === 0) {
        ide.rawOpenCloudDataString(snapData);
        if (window.snap.callme) {
            window.snap.callme();
        }
        callback(null);
    } else {
        callback('Invalid project');
    }
}

function registerSaveDataFetcherForSnap(ide, projectName) {
    var fetchSaveData = function () {
        var snapData = {};
        var myself = this,
            pdata,
            media,
            size,
            mediaSize;

        ide.serializer.isCollectingMedia = true;
        pdata = ide.serializer.serialize(ide.stage);
        media = ide.serializer.mediaXML(ide.projectName);
        ide.serializer.isCollectingMedia = false;
        ide.serializer.flushMedia();
        // snapData.pdata = pdata;
        // snapData.media = media;
        // snapData.projectName = ide.projectName;
        return '<snapdata>' + pdata + media + '</snapdata>';
    };
    c2stem.register_save_data_fetcher(projectName, fetchSaveData);
}

C2Stem.prototype.addSnap2Tab = function (id, name, template, callbackOnLoad) {
    var c2stem = this;
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

            c2stem.snapWin = window;

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
            c2stem.loadPublicProject(ide, template, function (err) {
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

C2Stem.prototype.addConcpetualModelingTab = function (id, name, data, callbackOnLoad) {
    var myself = this;
    $("body").append(`
        <div class="c2stem-cm" id="tab${id}">
        </div>`);

    window.snap.callme = function () {
        load_conceptual_model("conceptualModel", `tab${id}`, data, myself.register_save_data_fetcher);
    }
};



C2Stem.prototype.register_save_data_fetcher = function (name, fetcher) {
    if(c2stem.saveDataFetchers == undefined || c2stem.saveDataFetchers === null)
        c2stem.saveDataFetchers = [];
    // console.log("Registering fetcher",name,fetcher);
    c2stem.saveDataFetchers.push({
        name: name,
        fetcher: fetcher
    });
    // console.log("this.saveDataFetchers",c2stem.saveDataFetchers);
} ;

C2Stem.prototype.loadPublicProject = function (task_id, template, shallAppend, callback) {
    console.log('loading data for task', task_id, "with snap template", template);
    // var cloud = snapWin.SnapCloud;
    var cloud = C2StemCloud;
    cloud.loadUserProgress(cloud.encodeDict({
        Username: template !== null ? template.user : "",
        ProjectName: task_id,
        Template: template !== null ? template.proj : ""
    }), function (projectData) {
        c2stem.userTaskData = JSON.parse(projectData);
        console.log("loadPublicProject", c2stem.userTaskData);
        callback(null);
    }, function (err) {
        c2stem.userTaskData = {};
        callback(err);
    });
};

C2Stem.prototype.saveUserProgress = function(callback){
    console.log('saving user progress');
    var cloud = C2StemCloud;
    var userTaskData = {};
    var i = 0;
    console.log(this.saveDataFetchers);
    for(; i < this.saveDataFetchers.length; i++){
        f = this.saveDataFetchers[i];
        console.log(f, "Calling fetcher", f.name);
        var data = f.fetcher();
        userTaskData[f.name] = data;
    }
    console.log("Save user progress, userTaskData:", userTaskData);
    // userTaskData.conceptualModel = concepts;
    // console.log("Save user progress, userTaskData:", userTaskData);
    cloud.saveUserProgress(
        c2stem.task_id,
        userTaskData,
        function () {
            console.log("User data saved for task:",c2stem.task_id);
        },
        function (msg) {
            console.log("User data could not be saved, error:",msg);
        }
    );
};
