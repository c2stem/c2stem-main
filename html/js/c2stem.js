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
    console.log("query string:",q);
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
        var snapId = 'snap-' + id;
        C2StemActions.register(snapId, snapWindow.SnapActions);

        // Configure SnapActions to route everything through the global manager
         snapWindow.SnapActions.applyEvent = function (event) {
             if (!event.namespace) { // route all internal events through C2StemActions
                 event.namespace = snapId;
                 C2StemActions.applyEvent(event);
                 return snapWindow.ActionManager.prototype.applyEvent.call(this, event);
             }
         };

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
    var fetchSaveData = function (saveMedia) {
        var pdata,
            media;
        // console.log("Save Data Fetcher for Snap, saveMedia:",saveMedia);
        ide.serializer.isCollectingMedia = true;
        pdata = ide.serializer.serialize(ide.stage);
        if(saveMedia)
            media = ide.serializer.mediaXML(ide.projectName);
        ide.serializer.isCollectingMedia = false;
        ide.serializer.flushMedia();
        // snapData.pdata = pdata;
        // snapData.media = media;
        // snapData.projectName = ide.projectName;
        if(saveMedia)
            return '<snapdata>' + pdata + media + '</snapdata>';
        else
            return pdata;
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
        // c2stem.loadBlockCacheDefault( function () {
            load_conceptual_model("conceptualModel", `tab${id}`, data, myself.register_save_data_fetcher);
        // });
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
    var userName = template !== null ? template.user : "";
    if(c2stem.mode !== null && c2stem.mode === 'teacher')
        userName = c2stem.query.student;
    cloud.loadUserProgress(cloud.encodeDict({
        Username: userName,
        ProjectName: task_id,
        Template: template !== null ? template.proj : "",
        mode:c2stem.mode
    }), function (projectData) {
        c2stem.userTaskData = JSON.parse(projectData);
        console.log("loadPublicProject", c2stem.userTaskData);
        lastSavedData = JSON.stringify(c2stem.userTaskData);
        callback(null);
    }, function (err) {
        console.log(err);
        c2stem.userTaskData = {};
        callback(err);
    });
};
C2Stem.prototype.collectUserProgressData = function (saveMedia) {
    if(!c2stem.saveDataFetchers)
        return {};
    // console.log("collectUserProgressData, saveMedia:",saveMedia);
    saveMedia = saveMedia == undefined ? true : saveMedia;
    var userTaskData = {};
    var i = 0;
    // console.log(this.saveDataFetchers);
    for(; i < this.saveDataFetchers.length; i++){
        f = this.saveDataFetchers[i];
        // console.log(f, "Calling fetcher", f.name);
        var data = f.fetcher(saveMedia);
        userTaskData[f.name] = data;
    }
    return userTaskData;
}
var lastSavedData = "";
var isCurrentWorkingStatusUpdated = false;
C2Stem.prototype.saveUserProgress = function(callback){
    if(c2stem.mode !== null && c2stem.mode === 'teacher')
        return;
    // console.log('saving user progress for task:',c2stem.task_id);
    var cloud = C2StemCloud;
    var userTaskData = this.collectUserProgressData();
    var s = JSON.stringify(userTaskData);
    if(!isCurrentWorkingStatusUpdated){
        c2stem.recordCurrentTask();
    }
    console.log("saving progress data, isNewTask:", c2stem.isNewTask);
    if(c2stem.isNewTask){
        c2stem.recordTaskModified();
    }
    if(s === lastSavedData){
        console.log("SKIPPING SAVING AS THE DATA ARE SAME");
        return;
    }
    lastSavedData = s;
    // console.log("Save user progress, userTaskData:", userTaskData);
    // userTaskData.conceptualModel = concepts;
    // console.log("Save user progress, userTaskData:", userTaskData);
    cloud.saveUserProgress(
        c2stem.task_id,
        userTaskData,
        function () {
            // console.log("User data saved for task:",c2stem.task_id);
        },
        function (msg) {
            console.log("User data could not be saved, error:",msg);
        }
    );
};


C2Stem.prototype.SaveBlocksCache = function(cacheName, callback) {
    console.log('ExportSnapBlocks');
    var cloud = C2StemCloud;
    // var extracted_blocks = this.extractCustomBlocks(['LibrarySprite']);
    var extracted_blocks = this.extractCustomBlocks();
    var s = JSON.stringify(extracted_blocks);
    // console.log("Save user progress, userTaskData:", userTaskData);
    // userTaskData.conceptualModel = concepts;
    console.log("Save extracted_blocks, extracted_blocks:", extracted_blocks);
    cloud.saveUserProgress(
        cacheName,
        extracted_blocks,
        function () {
            console.log("ExtractedBlocks saved for task:", c2stem.task_id);
            if(callback)
                callback(null);
        },
        function (msg) {
            console.log("ExtractedBlocks could not be saved, error:", msg);
            if(callback)
                callback(msg);
        }
    );
};


C2Stem.prototype.loadBlocksCache = function (task_id, userName, callback) {
    console.log('loadBlocksCache', task_id, "with userName", userName);
    // var cloud = snapWin.SnapCloud;
    var cloud = C2StemCloud;
    cloud.loadUserProgress(cloud.encodeDict({
        Username: userName,
        ProjectName: task_id,
        Template: ""
    }), function (projectData) {
        c2stem.blockCache = JSON.parse(projectData);
        // console.log("loadBlocksCache", c2stem.blockCache);
        if(callback)
            callback(null);
    }, function (err) {
        c2stem.blockCache = {};
        if(callback)
            callback(err);
    });
};


C2Stem.prototype.extractCustomBlocks = function (filter_sprite_names) {
    var ide = snap.world.children[0];
    var candidateSprites = [];
    for (var s in ide.sprites.contents){
        if(!ide.sprites.contents.hasOwnProperty(s))
            continue;
        var sprite = ide.sprites.contents[s];
        if(filter_sprite_names == undefined || filter_sprite_names === null){
            candidateSprites.push(sprite);
        }
        else if(sprite.name in filter_sprite_names){
            candidateSprites.push(sprite);
        }
    }

    var blocks = {};
    for (var s in candidateSprites){
        var sprite = candidateSprites[s];

        // console.log("Processing cache_blocks:", c.cache_blocks);
        for (var block_id in sprite.customBlocks){
            if(sprite.customBlocks.hasOwnProperty(block_id)){
                var block = sprite.customBlocks[block_id];
                var blockXML = ide.serializer.serialize(block);
                blockXML = '<blocks>'+blockXML +'</blocks>';
                blocks[block.spec] = blockXML;
            }
        }
    }
    console.log("extracted blocks:", blocks)
    return blocks;
};

C2Stem.prototype.testBlockCache = function(){
    c2stem.SaveBlocksCache("ExtractedBlocks", function (error) {
        if(error === null){
            c2stem.loadBlocksCache("ExtractedBlocks", "nicole", function (error) {
                if(!error)
                    console.log("Loaded blockCache", c2stem.blockCache );
            });
        }
    });
}

C2Stem.prototype.loadBlockCacheDefault = function(callback){
    c2stem.loadBlocksCache("ExtractedBlocks", "nicole", function (error) {
        if(!error){
            console.log("Loaded default blockCache", c2stem.blockCache );
        }
        if(callback)
            callback();
    });
}


C2Stem.prototype.saveBlockCacheDefault = function(){
    c2stem.SaveBlocksCache("ExtractedBlocks", function (error) {
        if(error === null){
            console.log("Saved default blockCache");
        }
    });
}



C2Stem.prototype.SaveModulesState = function(callback) {
    console.log('SaveModulesState');
    var cloud = C2StemCloud;
    // var s = JSON.stringify(c2stem.module_state);
    cloud.saveUserProgress(
        "module_state",
        c2stem.module_state,
        function () {
            console.log("ModulesState saved:", c2stem.module_state);
            if(callback)
                callback(null);
        },
        function (msg) {
            console.log("ModulesState could not be saved, error:", msg);
            if(callback)
                callback(msg);
        }
    );
};


C2Stem.prototype.loadModulesState = function (callback) {
    console.log('loadModulesState');
    // var cloud = snapWin.SnapCloud;
    var cloud = C2StemCloud;
    cloud.loadUserProgress(cloud.encodeDict({
        Username: "",
        ProjectName: "module_state",
        Template: ""
    }), function (projectData) {
        c2stem.module_state = JSON.parse(projectData);
        // console.log("loadBlocksCache", c2stem.blockCache);
        if(callback)
            callback(null);
    }, function (err) {
        c2stem.module_state = {};
        if(callback)
            callback(err);
    });
};

C2Stem.prototype.getStudentStatus =function(study, callback){
    var cloud = C2StemCloud;
    cloud.getData("getStudentStatus", cloud.encodeDict({
        study: study
    }), function (studentStatus) {
        console.log("StudentStatus:",studentStatus);
        c2stem.studentsStatus = JSON.parse(studentStatus);
        if(callback)
            callback(null);
    }, function (err) {
        console.log("StudentStatus err:",err);
        c2stem.studentsStatus = {};
        if(callback)
            callback(err);
    });
};

C2Stem.prototype.getUserRole =function(callback){
    var cloud = C2StemCloud;
    cloud.getData("getUserRole","", function (userRole) {
        console.log("userRole:",userRole);
        c2stem.userRole = JSON.parse(userRole);
        if(callback)
            callback(null);
    }, function (err) {
        console.log("userRole err:",err);
        c2stem.userRole = {};
        if(callback)
            callback(err);
    });
};

C2Stem.prototype.isNewTask =function(callback){
    var cloud = C2StemCloud;
    cloud.getData("isNewTask", cloud.encodeDict({
        study: c2stem.userRole.study, taskID: c2stem.task_id
    }), function (isNew) {
        console.log("isNewTask:",isNew);
        c2stem.isNewTask = (JSON.parse(isNew)).isNew;
        if(callback)
            callback(null);
    }, function (err) {
        console.log("isNewTask err:",err);
        c2stem.isNewTask = true;
        if(callback)
            callback(err);
    });
};

C2Stem.prototype.recordTaskModified = function(callback){
    if(c2stem.userRole.role !== 'student'){
        if(callback)
            callback(null);
        return;
    }
    console.log("Record Task Modified", c2stem.module_id, c2stem.task_id);
    var taskData = c2stem.loadTaskData(c2stem.task_id);
    console.log("module name", taskData.parent.name, "task name", taskData.name);
    var cloud = C2StemCloud;
    cloud.recordTaskModified(
        c2stem.task_id,
        c2stem.userRole.study,
        function () {
            console.log("Student status updated, record task modified:", c2stem.task_id);
            c2stem.isNewTask = false;
            if(callback)
                callback(null);
        },
        function (msg) {
            console.log("Could not record task modified, error:", msg);
            if(callback)
                callback(msg);
        }
    );
};


C2Stem.prototype.recordTaskSubmitted = function(activityID, callback){
    if(c2stem.userRole.role !== 'student'){
        if(callback)
            callback(null);
        return;
    }
    console.log("Record Task Submitted", c2stem.module_id, c2stem.task_id);
    var cloud = C2StemCloud;
    cloud.recordTaskSubmitted(
        activityID,
        c2stem.task_id,
        c2stem.userRole.study,
        function () {
            console.log("Student status updated, record task submitted:", c2stem.task_id, " activity:", activityID);
            if(callback)
                callback(null);
        },
        function (msg) {
            console.log("Could not record task submitted, error:", msg);
            if(callback)
                callback(msg);
        }
    );
};


C2Stem.prototype.recordCurrentTask = function(callback){
    if(c2stem.userRole.role !== 'student'){
        if(callback)
            callback(null);
        return;
    }
    console.log("Record CurrentTask", c2stem.module_id, c2stem.task_id);
    var cloud = C2StemCloud;
    cloud.recordCurrentTask(
        c2stem.task_id,
        c2stem.userRole.study,
        function () {
            console.log("Student status updated, record current task:", c2stem.task_id);
            isCurrentWorkingStatusUpdated = true;
            if(callback)
                callback(null);
        },
        function (msg) {
            console.log("Could not record current task, error:", msg);
            if(callback)
                callback(msg);
        }
    );
};