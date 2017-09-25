window.snap = {}

var firstCsvList= [["Question", "Answer",""]];
var csvRows=[];
var QuestionSheet={
    item_1_1_1:"\"a. A sprite travels a distance of 20m at a constant speed of 0.5m/s.In order to program the motion of the sprite, indicate which of the following blocks should be used to initialize the model under the 'When clicked' block (to set the starting values),which should be executed in each simulation step under the 'simulation step' block (to be repeated in each ∆t time step),and which need not be used at all.\"",
    item_1_1_2a:"\"a. If ∆t is doubled to 0.4 instead of 0.2 in the program, which of the following tables will represent the new simulation data?\"",
    item_1_1_2b:"\"b. For the given program, we see that at 2 seconds, the x-position of the sprite is 2 meters. When ∆t is doubled to 0.4 instead of 0.2, what will the x-position of the sprite be at 3 seconds? \"",
    item_1_1_3:"\"A program for simulating the motion of a sprite traveling a distance of 25 meters with a speed of 2 meters/second is initialized. Which of the following code segments correctly models the motion of the sprite at every simulation step?\"",
    item_1_2_1:"\"Identify the objects that you would need in order to create a simulation for this motion.\"",
    item_1_2_3a:"\"a.  Which direction does the sprite travel in?\"",
    item_1_2_3b:"\"b. What is the sprite’s speed while in motion?\"",
    item_1_2_3c:"\"c. What is the total distance traveled that the sprite will have traveled when the simulation ends?\"",
    item_1_2_3d:"\"d. For how much time will the sprite have traveled when the simulation ends?\"",
    item_1_3_1:"\"The given program should simulate the motion of a sprite starting from rest and traveling a distance of 25 meters with an acceleration of 2 m/s per second. Which of the following expressions should be placed in the block in Line 1?\"",
    item_1_3_2:"\"Which of the following expressions should be placed in the block in Line 2?\"",
    item_1_4_1a:"\"a.  Based on the graph, determine whether each of the following motion segments is correctly or incorrectly modeled in Sara’s program.\"",
    item_1_4_1b:"\"b.  Some of the blocks of code in Sara’s model are shown below. Select the blocks that could be causes of errors in Sara’s model. Select all that apply.\"",
    item_1_4_2a:"\"The original code is modified as shown, setting ∆t to 0.1 instead of 0.5. What would the graph produced by the modified code look like?\"",
    item_1_4_2b:"\"Explain your choice:\"",
    item_1_4_2c:"\"Explain how the motion simulation based on the modified code (∆t=0.1) will look different from the motion simulation based on the original code (∆t=0.5):\"",
    item_1_4_2d:"\"Which of the following blocks of code do you think were modified in the original code to produce the graph shown above? \"",
    item_1_4_2e:"\"Explain your answer:\"",
    item_2_1_2a:"\"When Josh is halfway across the walkway, how far away from Josh is Kate?\"",
    item_2_1_2b:"\"Explain how you arrived at your answer.\"",
    item_2_1_3a:"\"Which boat will take longer to cross the river?\"",
    item_2_2_1:"\"In a simulation of the airplane’s motion, which of the following sets of blocks should be used to set the x and y components of the airplane’s resultant velocity?\"",
    item_2_2_2a:"\"a. Determining whether the car will need to be refueled before the end of the trip\"",
    item_2_2_2b:"\"Use the given procedure to explain your choice.\"",
    trainingbasics_1_A:"\"Try changing the values of Delta T - Do you notice any difference when you run the simulation? If so, please describe.\"",
    trainingbasics_1_B:"\"Describe how you might program the turtle to draw a 20-sided figure:\"",
    trainingbasics_1_C:"\"In order to draw the circle, which loop structure did you use and why? How many times did your program run through the loop before the circle was drawn?\"",
    trainingbasics_1_D:"\"What happens to your circle if you change velocity using a negative acceleration?\"",
    activity_1_1_A:"\"Which control structure did you use to program the sloth (if, if-else, repeat, etc) and why?\"",
    activity_1_1_B:"\"Make sure the [time in s] variable is selected. Set delta t to .5 and run your program. How long does it take the sloth to complete the journey in seconds?\"",
    activity_1_1_C:"\"Set the velocity to 4m/s. How much time does it take for the sloth to finish?\"",
    activity_1_1_D:"\"In your own words, describe what a simulation step is:\"",
    activity_1_2_B:"\"Without changing the positions of the cones given, how much time does it take to travel from cone1 to cone3?\"",
    activity_1_2_C:"\"Submit the the speed you used to allow Robbie to cover the distance between cone1 and cone3 in 8 minutes. Use your graph to determine, how long it would take the truck to travel 1.8 m at this speed?  2.2 m?\"",
    activity_1_3_A:"\"What is the sloth’s x velocity in m/s and x position be after 5 seconds?  How about after 23 seconds?\"",
    activity_1_3_B:"\"Run the program and use the “graphing view” buttons to answer the following questions: (1) What is the position of the sloth after 3 seconds? (2) at what time does the sloth cross the 10m mark?\"",
    activity_1_3_C:"\"Try reversing the order of your change position and change velocity blocks. What happens?\"",
    activity_1_4_B:"\"What is the x velocity of the truck in m/s after 3 seconds?\"",
    activity_1_4_C:"\"How long should the truck be in speed up mode before it changes in order to maintain target speed?\"",
    activity_1_4_D:"\"How long does it take the truck to move from the starting position to the stop sign?\"",
}

var trainingbasicsQuestion={
    textarea1: QuestionSheet.trainingbasics_1_A, textarea2: QuestionSheet.trainingbasics_1_B, textarea3: QuestionSheet.trainingbasics_1_C, textarea4: QuestionSheet.trainingbasics_1_D

}

var elaborateQuestion={
    textarea1: QuestionSheet.activity_1_1_A, textarea2: QuestionSheet.activity_1_1_B, textarea3: QuestionSheet.activity_1_1_C, textarea4: QuestionSheet.activity_1_1_D
}

var constantQuestion={
    textarea2a: QuestionSheet.activity_1_2_B, textarea2b: QuestionSheet.activity_1_2_C
}

var liftoffQuestion={
    textarea3a: QuestionSheet.activity_1_3_A, textarea3b: QuestionSheet.activity_1_3_B, textarea3c: QuestionSheet.activity_1_3_C
}

var stopQuestion={
    textarea4a: QuestionSheet.activity_1_4_B, textarea4b: QuestionSheet.activity_1_4_C, textarea4c: QuestionSheet.activity_1_4_D
}

var checkin1question={
    radio_1_1_1_a: QuestionSheet.item_1_1_1, radio_1_1_1_b: QuestionSheet.item_1_1_1, radio_1_1_1_c: QuestionSheet.item_1_1_1, radio_1_1_1_d: QuestionSheet.item_1_1_1, radio_1_1_1_e: QuestionSheet.item_1_1_1, radio_1_1_1_f: QuestionSheet.item_1_1_1, radio_1_1_1_g: QuestionSheet.item_1_1_1, radio_1_1_1_h: QuestionSheet.item_1_1_1, radio_1_1_1_i: QuestionSheet.item_1_1_1, radio_1_1_1_j: QuestionSheet.item_1_1_1, radio_1_1_1_k: QuestionSheet.item_1_1_1, radio_1_1_1_l: QuestionSheet.item_1_1_1, radio_1_1_1_m: QuestionSheet.item_1_1_1, radio_1_1_1_n: QuestionSheet.item_1_1_1, radio_1_1_1_o: QuestionSheet.item_1_1_1, radio_1_1_1_p: QuestionSheet.item_1_1_1, radio_1_1_1_q: QuestionSheet.item_1_1_1, radio_1_1_1_r: QuestionSheet.item_1_1_1, radio_1_1_1_s: QuestionSheet.item_1_1_1, radio_1_1_1_t: QuestionSheet.item_1_1_1, radio_1_1_1_u: QuestionSheet.item_1_1_1, radio_1_1_1_v: QuestionSheet.item_1_1_1, radio_1_1_1_w: QuestionSheet.item_1_1_1, radio_1_1_1_x: QuestionSheet.item_1_1_1, radio1_1_2_a: QuestionSheet.item_1_1_2a, radio1_1_2_b: QuestionSheet.item_1_1_2a, radio1_1_2_c: QuestionSheet.item_1_1_2a, radio1_1_2_d: QuestionSheet.item_1_1_2b, radio1_1_2_e: QuestionSheet.item_1_1_2b, radio1_1_2_f: QuestionSheet.item_1_1_2b, text1_1_2_b: QuestionSheet.item_1_1_2b, radio1_1_3_a: QuestionSheet.item_1_1_3, radio1_1_3_b: QuestionSheet.item_1_1_3, radio1_1_3_c: QuestionSheet.item_1_1_3, radio1_1_3_d: QuestionSheet.item_1_1_3, radio1_1_3_e: QuestionSheet.item_1_1_3, radio1_1_3_f: QuestionSheet.item_1_1_3
}

var checkin2Question={ objects: QuestionSheet.item_1_2_1, radio1_2_3_a: QuestionSheet.item_1_2_3a, radio1_2_3_b: QuestionSheet.item_1_2_3a, radio1_2_3_c: QuestionSheet.item_1_2_3a, radio1_2_3_d: QuestionSheet.item_1_2_3a, text_1_2_3_a: QuestionSheet.item_1_2_3b, text_1_2_3_b: QuestionSheet.item_1_2_3c, text_1_2_3_c: QuestionSheet.item_1_2_3c};

var checkin3Question={ radio1_3_1_a: QuestionSheet.item_1_3_1, radio1_3_1_b: QuestionSheet.item_1_3_1, radio1_3_1_c: QuestionSheet.item_1_3_1, radio1_3_1_d: QuestionSheet.item_1_3_1, radio1_3_1_e: QuestionSheet.item_1_3_1, radio1_3_1_f: QuestionSheet.item_1_3_2, radio1_3_1_g: QuestionSheet.item_1_3_2, radio1_3_1_h: QuestionSheet.item_1_3_2, radio1_3_1_i: QuestionSheet.item_1_3_2, radio1_3_1_j: QuestionSheet.item_1_3_2};

var checkin4Question={ radio_1_4_1a_a: QuestionSheet.item_1_4_1a,
    radio_1_4_1a_b: QuestionSheet.item_1_4_1a, radio_1_4_1a_c: QuestionSheet.item_1_4_1a, radio_1_4_1a_d: QuestionSheet.item_1_4_1a, radio_1_4_1a_e: QuestionSheet.item_1_4_1a, radio_1_4_1a_f: QuestionSheet.item_1_4_1a, radio_1_4_1a_g: QuestionSheet.item_1_4_1a, radio_1_4_1a_h: QuestionSheet.item_1_4_1a, checkbox1_4_1b_a: QuestionSheet.item_1_4_1b, checkbox1_4_1b_b: QuestionSheet.item_1_4_1b , checkbox1_4_1b_c: QuestionSheet.item_1_4_1b, checkbox1_4_1b_d: QuestionSheet.item_1_4_1b, radio1_4_2a_a: QuestionSheet.item_1_4_2a, radio1_4_2a_b: QuestionSheet.item_1_4_2a, radio1_4_2a_c: QuestionSheet.item_1_4_2a, text_1_4_2a_a: QuestionSheet.item_1_4_2b, text_1_4_2c: QuestionSheet.item_1_4_1a, checkbox1_4_2b_a: QuestionSheet.item_1_4_2d, checkbox1_4_2b_b: QuestionSheet.item_1_4_2d, checkbox1_4_2b_c: QuestionSheet.item_1_4_2d, checkbox1_4_2b_d: QuestionSheet.item_1_4_12d, text_1_4_2b_a: QuestionSheet.item_1_4_2c};

var checkin1answer={
    radio_1_1_1_a: "Incorrect", radio_1_1_1_b:  "Correct", radio_1_1_1_c:  "Incorrect", radio_1_1_1_d:  "Correct", radio_1_1_1_e:  "Incorrect", radio_1_1_1_f:  "Incorrect", radio_1_1_1_g:  "Incorrect", radio_1_1_1_h:  "Correct", radio_1_1_1_i:  "Incorrect", radio_1_1_1_j:  "Correct", radio_1_1_1_k:  "Incorrect", radio_1_1_1_l:  "Incorrect", radio_1_1_1_m:  "Incorrect", radio_1_1_1_n: "Incorrect", radio_1_1_1_o: "Correct", radio_1_1_1_p: "Incorrect", radio_1_1_1_q: "Correct", radio_1_1_1_r: "Incorrect", radio_1_1_1_s: "Incorrect", radio_1_1_1_t: "Correct", radio_1_1_1_u: "Incorrect", radio_1_1_1_v: "Correct", radio_1_1_1_w: "Incorrect", radio_1_1_1_x: "Incorrect", radio1_1_2_a: "Incorrect", radio1_1_2_b: "Correct", radio1_1_2_c: "Incorrect", radio1_1_2_d: "Incorrect", radio1_1_2_e: "Incorrect", radio1_1_2_f: "Correct", radio1_1_3_a:  "Incorrect", radio1_1_3_b:  "Correct", radio1_1_3_c:  "Incorrect", radio1_1_3_d:  "Incorrect", radio1_1_3_e:  "Incorrect", radio1_1_3_f:  "Incorrect"
}

var checkin2Answer={  radio1_2_3_a:"Correct", radio1_2_3_b:"Incorrect", radio1_2_3_c:"Incorrect", radio1_2_3_d:"Incorrect"};

var checkin3Answer={ radio1_3_1_a: "Incorrect", radio1_3_1_b:"Incorrect", radio1_3_1_c:"Correct", radio1_3_1_d:"Incorrect", radio1_3_1_e:"Incorrect", radio1_3_1_f:"Incorrect", radio1_3_1_g:"Incorrect", radio1_3_1_h:"Incorrect", radio1_3_1_i:"Incorrect", radio1_3_1_j:"Correct"};

var checkin4Answer={ radio_1_4_1a_a: "Correct",
    radio_1_4_1a_b:"Incorrect", radio_1_4_1a_c: "Correct", radio_1_4_1a_d:"Incorrect", radio_1_4_1a_e: "Incorrect", radio_1_4_1a_f:"Correct", radio_1_4_1a_g:"Incorrect", radio_1_4_1a_h:"Correct", checkbox1_4_1b_a:"Incorrect", checkbox1_4_1b_b:"Correct", checkbox1_4_1b_c:"Incorrect", checkbox1_4_1b_d:"Correct", radio1_4_2a_a:"Incorrect", radio1_4_2a_b: "Correct", radio1_4_2a_c: "Incorrect", checkbox1_4_2b_a:"Incorrect", checkbox1_4_2b_b:"Incorrect", checkbox1_4_2b_c: "Correct", checkbox1_4_2b_d:"Incorrect"};

//var studentList= [ "abreha_nathan", "kelso_micheal", "jackie"];
var instructionList= [ "trainingbasics", "checkin1", "constant", "elaborate", "liftoff", "checkin2", "checkin3", "checkin4", "stop"];
var trainingList=[ "textarea1", "textarea2", "textarea3", "textarea4"];
var checkin1List={ radio_1_1_1_a:"Under \"When Clicked\"", radio_1_1_1_b:"Under \"Simulation Step\"", radio_1_1_1_c:"Unnecessary block", radio_1_1_1_d:"Under \"When Clicked\"", radio_1_1_1_e:"Under \"Simulation Step\"", radio_1_1_1_f:"Unnecessary block", radio_1_1_1_g:"Under \"When Clicked\"", radio_1_1_1_h:"Under \"Simulation Step\"", radio_1_1_1_i:"Unnecessary block", radio_1_1_1_j:"Under \"When Clicked\"", radio_1_1_1_k:"Under \"Simulation Step\"", radio_1_1_1_l:"Unnecessary block", radio_1_1_1_m:"Under \"When Clicked\"", radio_1_1_1_n:"Under \"Simulation Step\"", radio_1_1_1_o:"Unnecessary block", radio_1_1_1_p:"Under \"When Clicked\"", radio_1_1_1_q:"Under \"Simulation Step\"", radio_1_1_1_r:"Unnecessary block", radio_1_1_1_s:"Under \"When Clicked\"", radio_1_1_1_t:"Under \"Simulation Step\"", radio_1_1_1_u:"Unnecessary block", radio_1_1_1_v:"Under \"When Clicked\"", radio_1_1_1_w:"Under \"Simulation Step\"", radio_1_1_1_x:"Unnecessary block", radio1_1_2_a:"Sprite X Position(0, 0.2, 0.4, 0.6, 0.8, 1, 1.2)", radio1_1_2_b:"Sprite X Position(0, 0.4, 0.8, 1.2, 1.6, 2, 2.4)", radio1_1_2_c:"Sprite X Position(0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6)", radio1_1_2_d:"Less than 2 meters", radio1_1_2_e:"More than 2 meters", radio1_1_2_f:"Equal to 2 meters", text1_1_2_b: "text1_1_2_b", radio1_1_3_a:"a", radio1_1_3_b:"b", radio1_1_3_c:"c", radio1_1_3_d:"d", radio1_1_3_e:"e", radio1_1_3_f:"f"};
var checkin2List={ objects:"", row_1_object:"", row_1_property:"", row_1_behaviour:"", radio1_2_3_a:"", radio1_2_3_b:"", radio1_2_3_c:"", radio1_2_3_d:"", text_1_2_3_a:"", text_1_2_3_b:"", text_1_2_3_c:""};
var checkin3List={ radio1_3_1_a:"", radio1_3_1_b:"", radio1_3_1_c:"", radio1_3_1_d:"", radio1_3_1_e:"", radio1_3_1_f:"", radio1_3_1_g:"", radio1_3_1_h:"", radio1_3_1_i:"", radio1_3_1_j:""};
var checkin4List={ radio_1_4_1a_a:"", radio_1_4_1a_b:"", radio_1_4_1a_c:"", radio_1_4_1a_d:"", radio_1_4_1a_e:"", radio_1_4_1a_f:"", radio_1_4_1a_g:"", radio_1_4_1a_h:"", checkbox1_4_1b_a:"", checkbox1_4_1b_b :"", checkbox1_4_1b_c:"", checkbox1_4_1b_d:"", radio1_4_2a_a:"", radio1_4_2a_b:"", radio1_4_2a_c:"", text_1_4_2a_a:"", text_1_4_2a_b:"", checkbox1_4_2b_a:"", checkbox1_4_2b_b:"", checkbox1_4_2b_c:"", checkbox1_4_2b_d:"", text_1_4_2b_a:""};
var elaborate=["textarea1", "textarea2", "textarea3", "textarea4"];
var constant=["textarea2a", "textarea2b"];
var liftoff=["textarea3a", "textarea3b", "textarea3c"];
var stop=["textarea4a", "textarea4b", "textarea4c"];
var studentName;
var questionTracker="first";

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

// user name is not stored locally, server checks if connected
C2Stem.prototype.reconnect = function (callBack, errorCall) {
    c2stem.login(null, null, null, callBack);
    // this.login(null, null, null, function (err) {
    //     callback(err, err ? null : res);
    // });
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

// TODO: Check if the snap environment has been loaded
function on_snap_project_loading_done(ide, snapData, callback) {
    if (snapData != undefined && snapData.indexOf('<snapdata') === 0) {
        ide.rawOpenCloudDataString(snapData);
        if (window.snap.callme) {
            window.snap.callme();
        }
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(snapData,"text/xml");

        var snapProjectName = xmlDoc.getElementsByTagName("project")[0].getAttribute("name");
        // console.log("checking snapProjectName: " + snapProjectName);
        console.log("snap project loaded:", snapProjectName, ", is it corrupted: " , snapProjectName.toLowerCase() === "untitled");
        if(snapProjectName.toLowerCase() === "untitled" ) {
            console.log("Loaded Corrupted or Unwanted snap project!");
            c2stem.isCorruptedProject = true;
            c2stem.untitled_project_loaded();
        }
        callback(null);
    } else {
        console.log("Invalid snap project loaded!");
        c2stem.isCorruptedProject = true;
        c2stem.untitled_project_loaded();
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
    console.log("save DATA Fectcher"+this.saveDataFetchers);
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
    c2stem.userTaskData = userTaskData;
    var s = JSON.stringify(userTaskData);



    if(c2stem.isCorruptedProject) {
        console.log("Corrupted or unwanted snap project, will not save user progress at this point");
        return;
    }
    if(!isCurrentWorkingStatusUpdated){
        c2stem.recordCurrentTask();
    }
    console.log("saving progress data, isNewTask:", c2stem.isNewTask, "data: ", userTaskData );
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
            if(msg === "ERROR: User not logged in"){
                console.log("taking user to the login page");
                // c2stem.logout(function (err) {
                //     window.location.href = "login.html";
                // });
                c2stem.relogin();
            }
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

C2Stem.prototype.getStudentAssessmentData =function(studentList, callback){
    var cloud = C2StemCloud;
    // cloud.getData("getStudentAssessmentData", cloud.encodeDict({
    //     studentList: JSON.stringify(studentList)
    // }), function (assessmentData) {
    //     c2stem.studentAssessmentData = JSON.parse(assessmentData);
    //     if(callback)
    //         callback(null);
    // }, function (err) {
    //     console.log("getStudentAssessmentData err:",err);
    //     c2stem.studentAssessmentData = {};
    //     if(callback)
    //         callback(err);
    // });

    cloud.getStudentAssessmentData(
        JSON.stringify(studentList),
        function (response) {
            // console.log("response");
            // console.log(response);
            c2stem.studentAssessmentData = JSON.parse(response);
            if(callback)
                callback(null);
        },
        function (msg) {
            console.log("getStudentAssessmentData err:",msg);
            c2stem.studentAssessmentData = {};
            if(callback)
                callback(msg);
        }
    );
}



C2Stem.prototype.getStudentStatus =function(study, callback){
    var cloud = C2StemCloud;
    cloud.getData("getStudentStatus", cloud.encodeDict({
        study: study
    }), function (studentStatus) {
        // console.log("StudentStatus:",studentStatus);
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


C2Stem.prototype.untitled_project_loaded =function(){
    var modalReload = document.getElementById('modal-reload-corrupted');
        modalReload.style.display = "block";
}

C2Stem.prototype.relogin =function(){
    var modalReload = document.getElementById('modal-reload-login');
    modalReload.style.display = "block";
}

C2Stem.prototype.createCSV=function(data, studentList){
    for(var stu in studentList){
        if(studentList[stu]){
            studentName= studentList[stu];
            console.log("studentList[stu]");
        }else if(studentList.stu){
            studentName= studentList.stu;
            console.log("studentList.stu");
        }else if(studentList["stu"]){
            studentName= studentList["stu"];
            console.log("studentList[\"stu\"]");
        }
        firstCsvList.push(studentName);
        var Q;
        if(data[studentName]){
            Q=data[studentName];
            console.log("data[studentName]");
        }else if(data.studentName){
            Q=data.studentName;
            console.log("data.studentName");
        }else if(data["studentName"]){
            Q=data["studentName"];
            console.log("data[\"studentName\"]");
        }
        var A;
        if(Q.tasks){
            A=Q.tasks;
            console.log("Q.tasks");
        }else if(Q[tasks]){
            A=Q[tasks];
            console.log("Q[tasks]");
        }else if(Q["tasks"]){
            A=Q["tasks"];
            console.log("Q[\"tasks\"]");
        }
        for(var inst in instructionList){
            var instruction;
            if(instructionList[inst]){
                instruction= instructionList[inst];
                console.log("instructionList[inst]");
            }else if(instructionList.inst){
                instruction= instructionList.inst;
                console.log("instructionList.inst");
            }else if(instructionList["inst"]){
                instruction= instructionList["inst"];
                console.log("instructionList[\"inst\"]");
            }
            if( instruction in A){
                var instruct;
                if(A[instruction]){
                    instruct= A[instruction];
                    console.log("A[instruction]");
                }else if(A.instruction){
                    instruct= A.instruction;
                    console.log("A.instruction");
                }else if(A["instruction"]){
                    instruct= A["instruction"];
                    console.log("A[\"instruction\"]");
                }

                var specificInst;
                if(instruct.assessmentData){
                    specificInst=instruct.assessmentData;
                    console.log("instruct.assessmentData");
                }else if(instruct[assessmentData]){
                    specificInst=instruct[assessmentData];
                    console.log("instruct[assessmentData]");
                }else if(instruct["assessmentData"]){
                    specificInst= instruct["assessmentData"];
                    console.log("instruct[\"assessmentData\"]");
                }

                switch(instruction){

                    case "trainingbasics":
                        for(var obj in trainingList){
                            var train;
                            if(trainingList[obj] ){
                                train= trainingList[obj] ;
                                console.log("trainingList[obj] ");
                            }else if(trainingList.obj ){
                                train= trainingList.obj ;
                                console.log("trainingList.obj");
                            }else if(trainingList["obj"] ){
                                train= trainingList["obj"] ;
                                console.log("trainingList[\"obj\"]");
                            }
                            if( train in specificInst){
                                var quest;
                                var answ;
                                if(trainingbasicsQuestion[train]){
                                    quest= trainingbasicsQuestion[train] ;
                                    console.log("trainingbasicsQuestion[train]");
                                }else if(trainingbasicsQuestion.train){
                                    quest= trainingbasicsQuestion.train ;
                                    console.log("trainingbasicsQuestion.train");
                                }else if(trainingbasicsQuestion["train"]){
                                    quest= trainingbasicsQuestion["train"] ;
                                    console.log("trainingbasicsQuestion[\"train\"]");
                                }

                                if(specificInst[train]){
                                    answ= specificInst[train] ;
                                    console.log("specificInst[train]");
                                }else if(specificInst.train){
                                    answ= specificInst.train ;
                                    console.log("specificInst.train");
                                }else if(specificInst["train"]){
                                    answ= specificInst["train"] ;
                                    console.log("specificInst[\"train\"]");
                                }

                                firstCsvList.push([quest, answ]);
                            }
                        }
                        break;
                    case "checkin1":
                        for(var obj in checkin1List){
                             var answ;
                            if(checkin1List[obj] ){
                                answ= checkin1List[obj] ;
                                console.log("checkin1List[obj] ");
                            }else if(checkin1List.obj ){
                                answ= checkin1List.obj ;
                                console.log("checkin1List.obj");
                            }else if(checkin1List["obj"] ){
                                answ= checkin1List["obj"] ;
                                console.log("checkin1List[\"obj\"]");
                            }

                            if( answ in specificInst){
                                var quest, grade, specificAnswer;
                                if(specificInst[answ]){
                                    specificAnswer= specificInst[answ] ;
                                    console.log("specificInst[answ]");
                                }else if(specificInst.answ){
                                    specificAnswer= specificInst.answ;
                                    console.log("specificInst.answ");
                                }else if(specificInst["answ"]){
                                    specificAnswer= specificInst["answ"] ;
                                    console.log("specificInst[\"answ\"]");
                                }

                                if(checkin1question[obj] ){
                                    quest= checkin1question[obj] ;
                                    console.log("checkin1question[obj] ");
                                }else if(checkin1question.obj ){
                                    quest= checkin1question.obj ;
                                    console.log("checkin1question.obj");
                                }else if(checkin1question["obj"] ){
                                    quest= checkin1question["obj"] ;
                                    console.log("checkin1question[\"obj\"]");
                                }

                                if(checkin1answer[obj] ){
                                    grade= checkin1answer[obj] ;
                                    console.log("checkin1answer[obj] ");
                                }else if(checkin1answer.obj ){
                                    grade= checkin1answer.obj ;
                                    console.log("checkin1answer.obj");
                                }else if(checkin1answer["obj"] ){
                                    grade= checkin1answer["obj"] ;
                                    console.log("checkin1answer[\"obj\"]");
                                }

                                if(questionTracker===quest){
                                    if(obj.includes("text")){
                                        firstCsvList.push(["same Question" , specificAnswer, ""]);
                                    }else{
                                        firstCsvList.push(["same Question" , answ, grade]);
                                    }
                                }else{
                                    if(obj.includes("text")){
                                        firstCsvList.push([quest , specificAnswer, ""]);
                                    }else{
                                        firstCsvList.push([quest, answ, grade]);
                                    }
                                }
                                questionTracker=quest;
                            }
                        }
                        break;
                    case "checkin2":
                        for(var obj in checkin2List){
                            var answ;
                            if(checkin2List[obj] ){
                                answ= checkin2List[obj] ;
                                console.log("checkin2List[obj] ");
                            }else if(checkin2List.obj ){
                                answ= checkin2List.obj ;
                                console.log("checkin2List.obj");
                            }else if(checkin2List["obj"] ){
                                answ= checkin2List["obj"] ;
                                console.log("checkin2List[\"obj\"]");
                            }
                            if( answ in specificInst){
                                var quest, grade, specificAnswer;


                                if(specificInst[answ]){
                                    specificAnswer= specificInst[answ] ;
                                    console.log("specificInst[answ]");
                                }else if(specificInst.answ){
                                    specificAnswer= specificInst.answ;
                                    console.log("specificInst.answ");
                                }else if(specificInst["answ"]){
                                    specificAnswer= specificInst["answ"] ;
                                    console.log("specificInst[\"answ\"]");
                                }

                                if(checkin2Question[obj] ){
                                    quest= checkin2Question[obj] ;
                                    console.log("checkin2Question[obj] ");
                                }else if(checkin2Question.obj ){
                                    quest= checkin2Question.obj ;
                                    console.log("checkin2Question.obj");
                                }else if(checkin2Question["obj"] ){
                                    quest= checkin2Question["obj"] ;
                                    console.log("checkin2Question[\"obj\"]");
                                }

                                if(checkin2Answer[obj] ){
                                    grade= checkin2Answer[obj] ;
                                    console.log("checkin2Answer[obj] ");
                                }else if(checkin2Answer.obj ){
                                    grade= checkin2Answer.obj ;
                                    console.log("checkin2Answer.obj");
                                }else if(checkin2Answer["obj"] ){
                                    grade= checkin2Answer["obj"] ;
                                    console.log("checkin2Answer[\"obj\"]");
                                }
                                if(questionTracker===quest){
                                    if(obj.includes("text")){
                                        firstCsvList.push(["same Question" , specificAnswer, ""]);
                                    }else{
                                        firstCsvList.push(["same Question" , answ, grade]);
                                    }
                                }else{
                                    if(obj.includes("text")){
                                        firstCsvList.push([quest , specificAnswer, ""]);
                                    }else{
                                        firstCsvList.push([quest, answ, grade]);
                                    }
                                }
                                questionTracker=quest;
                            }
                        }
                        break;
                    case "checkin3":
                        for(var obj in checkin3List){
                            var answ;
                            if(checkin3List[obj] ){
                                answ= checkin3List[obj] ;
                                console.log("checkin3List[obj] ");
                            }else if(checkin3List.obj ){
                                answ= checkin3List.obj ;
                                console.log("checkin3List.obj");
                            }else if(checkin3List["obj"] ){
                                answ= checkin3List["obj"] ;
                                console.log("checkin3List[\"obj\"]");
                            }

                            if( answ in specificInst){
                                var quest, grade, specificAnswer;

                                if(specificInst[answ]){
                                    specificAnswer= specificInst[answ] ;
                                    console.log("specificInst[answ]");
                                }else if(specificInst.answ){
                                    specificAnswer= specificInst.answ;
                                    console.log("specificInst.answ");
                                }else if(specificInst["answ"]){
                                    specificAnswer= specificInst["answ"] ;
                                    console.log("specificInst[\"answ\"]");
                                }

                                if(checkin3Question[obj] ){
                                    quest= checkin3Question[obj] ;
                                    console.log("checkin3Question[obj] ");
                                }else if(checkin3Question.obj ){
                                    quest= checkin3Question.obj ;
                                    console.log("checkin3Question.obj");
                                }else if(checkin3Question["obj"] ){
                                    quest= checkin3Question["obj"] ;
                                    console.log("checkin3Question[\"obj\"]");
                                }

                                if(checkin3Answer[obj] ){
                                    grade= checkin3Answer[obj] ;
                                    console.log("checkin3Answer[obj] ");
                                }else if(checkin3Answer.obj ){
                                    grade= checkin3Answer.obj ;
                                    console.log("checkin3Answer.obj");
                                }else if(checkin3Answer["obj"] ){
                                    grade= checkin3Answer["obj"] ;
                                    console.log("checkin3Answer[\"obj\"]");
                                }

                                if(questionTracker===quest){
                                    if(obj.includes("text")){
                                        firstCsvList.push(["same Question" , specificAnswer, ""]);
                                    }else{
                                        firstCsvList.push(["same Question" , answ, grade]);
                                    }
                                }else{
                                    if(obj.includes("text")){
                                        firstCsvList.push([quest , specificAnswer, ""]);
                                    }else{
                                        firstCsvList.push([quest, answ, grade]);
                                    }
                                }
                                questionTracker=quest;
                            }
                        }
                        break;
                    case "checkin4":
                        for(var obj in checkin4List){
                            var answ;
                            if(checkin4List[obj] ){
                                answ= checkin4List[obj] ;
                                console.log("checkin4List[obj] ");
                            }else if(checkin4List.obj ){
                                answ= checkin4List.obj ;
                                console.log("checkin4List.obj");
                            }else if(checkin4List["obj"] ){
                                answ= checkin4List["obj"] ;
                                console.log("checkin4List[\"obj\"]");
                            }

                            if( answ in specificInst){
                                var quest, grade, specificAnswer;

                                if(specificInst[answ]){
                                    specificAnswer= specificInst[answ] ;
                                    console.log("specificInst[answ]");
                                }else if(specificInst.answ){
                                    specificAnswer= specificInst.answ;
                                    console.log("specificInst.answ");
                                }else if(specificInst["answ"]){
                                    specificAnswer= specificInst["answ"] ;
                                    console.log("specificInst[\"answ\"]");
                                }

                                if(checkin4Question[obj] ){
                                    quest= checkin4Question[obj] ;
                                    console.log("checkin4Question[obj] ");
                                }else if(checkin4Question.obj ){
                                    quest= checkin4Question.obj ;
                                    console.log("checkin4Question.obj");
                                }else if(checkin4Question["obj"] ){
                                    quest= checkin4Question["obj"] ;
                                    console.log("checkin4Question[\"obj\"]");
                                }

                                if(checkin4Answer[obj] ){
                                    grade= checkin4Answer[obj] ;
                                    console.log("checkin4Answer[obj] ");
                                }else if(checkin4Answer.obj ){
                                    grade= checkin4Answer.obj ;
                                    console.log("checkin4Answer.obj");
                                }else if(checkin4Answer["obj"] ){
                                    grade= checkin4Answer["obj"] ;
                                    console.log("checkin4Answer[\"obj\"]");
                                }


                                if(questionTracker===quest){
                                    if(obj.includes("text")){
                                        firstCsvList.push(["same Question" , specificAnswer, ""]);
                                    }else{
                                        firstCsvList.push(["same Question" , answ, grade]);
                                    }
                                }else{
                                    if(obj.includes("text")){
                                        firstCsvList.push([quest , specificAnswer, ""]);
                                    }else{
                                        firstCsvList.push([quest, answ, grade]);
                                    }
                                }
                                questionTracker=quest;
                            }
                        }
                        break;

                    case "constant":
                        for(var obj in constant){
                            var con;
                            if(constant[obj] ){
                                con= constant[obj] ;
                                console.log("constant[obj] ");
                            }else if(constant.obj ){
                                con= constant.obj ;
                                console.log("constant.obj");
                            }else if(constant["obj"] ){
                                con= constant["obj"] ;
                                console.log("constant[\"obj\"]");
                            }
                            if( con in specificInst){
                                var answ, quest;
                                if(specificInst[con]){
                                    answ= specificInst[con] ;
                                    console.log("specificInst[con]");
                                }else if(specificInst.con){
                                    answ= specificInst.con;
                                    console.log("specificInst.con");
                                }else if(specificInst["con"]){
                                    answ= specificInst["con"] ;
                                    console.log("specificInst[\"con\"]");
                                }
                                if(constantQuestion[con]){
                                    quest= constantQuestion[con] ;
                                    console.log("constantQuestion[con]");
                                }else if(constantQuestion.con){
                                    quest= constantQuestion.con;
                                    console.log("constantQuestion.con");
                                }else if(constantQuestion["con"]){
                                    quest= constantQuestion["con"] ;
                                    console.log("constantQuestion[\"con\"]");
                                }

                                firstCsvList.push([quest,  answ]);
                            }
                        }
                        break;
                    case "elaborate":
                        for(var obj in elaborate){
                            var elab;
                            if(elaborate[obj] ){
                                elab= elaborate[obj] ;
                                console.log("elaborate[obj] ");
                            }else if(elaborate.obj ){
                                elab= elaborate.obj ;
                                console.log("elaborate.obj");
                            }else if(elaborate["obj"] ){
                                elab= elaborate["obj"] ;
                                console.log("elaborate[\"obj\"]");
                            }
                            if( elab in specificInst){
                                var answ, quest;
                                if(specificInst[elab]){
                                    answ= specificInst[elab] ;
                                    console.log("specificInst[elab]");
                                }else if(specificInst.elab){
                                    answ= specificInst.elab;
                                    console.log("specificInst.elab");
                                }else if(specificInst["elab"]){
                                    answ= specificInst["elab"] ;
                                    console.log("specificInst[\"elab\"]");
                                }
                                if(elaborateQuestion[elab]){
                                    quest= elaborateQuestion[elab] ;
                                    console.log("elaborateQuestion[elab]");
                                }else if(elaborateQuestion.elab){
                                    quest= elaborateQuestion.elab;
                                    console.log("elaborateQuestion.elab");
                                }else if(elaborateQuestion["elab"]){
                                    quest= elaborateQuestion["elab"] ;
                                    console.log("elaborateQuestion[\"elab\"]");
                                }
                                firstCsvList.push([quest,  answ]);
                            }
                        }
                        break;
                    case "liftoff":
                        for(var obj in liftoff){
                            var lift;
                            if(liftoff[obj] ){
                                lift= liftoff[obj] ;
                                console.log("liftoff[obj] ");
                            }else if(liftoff.obj ){
                                lift= liftoff.obj ;
                                console.log("liftoff.obj");
                            }else if(liftoff["obj"] ){
                                lift= liftoff["obj"] ;
                                console.log("liftoff[\"obj\"]");
                            }
                            if( lift in specificInst){
                                var answ, quest;
                                if(specificInst[lift]){
                                    answ= specificInst[lift] ;
                                    console.log("specificInst[lift]");
                                }else if(specificInst.lift){
                                    answ= specificInst.lift;
                                    console.log("specificInst.lift");
                                }else if(specificInst["lift"]){
                                    answ= specificInst["lift"] ;
                                    console.log("specificInst[\"lift\"]");
                                }
                                if(liftoffQuestion[lift]){
                                    quest= liftoffQuestion[lift] ;
                                    console.log("liftoffQuestion[lift]");
                                }else if(liftoffQuestion.lift){
                                    quest= liftoffQuestion.lift;
                                    console.log("liftoffQuestion.lift");
                                }else if(liftoffQuestion["lift"]){
                                    quest= liftoffQuestion["lift"] ;
                                    console.log("liftoffQuestion[\"lift\"]");
                                }
                                firstCsvList.push([quest,  answ]);
                            }
                        }
                        break;

                    case "stop":
                        for(var obj in stop){
                            var stp;
                            if(stop[obj] ){
                                stp= stop[obj] ;
                                console.log("stop[obj] ");
                            }else if(stop.obj ){
                                stp= stop.obj ;
                                console.log("stop.obj");
                            }else if(stop["obj"] ){
                                stp= stop["obj"] ;
                                console.log("stop[\"obj\"]");
                            }
                            if( stp in specificInst){
                                var answ, quest;
                                if(specificInst[stp]){
                                    answ= specificInst[stp] ;
                                    console.log("specificInst[stp]");
                                }else if(specificInst.stp){
                                    answ= specificInst.stp;
                                    console.log("specificInst.stp");
                                }else if(specificInst["stp"]){
                                    answ= specificInst["stp"] ;
                                    console.log("specificInst[\"stp\"]");
                                }
                                if(stopQuestion[stp]){
                                    quest= stopQuestion[stp] ;
                                    console.log("stopQuestion[stp]");
                                }else if(stopQuestion.stp){
                                    quest= stopQuestion.stp;
                                    console.log("stopQuestion.stp");
                                }else if(stopQuestion["stp"]){
                                    quest= stopQuestion["stp"] ;
                                    console.log("stopQuestion[\"stp\"]");
                                }
                                firstCsvList.push([quest,  answ]);
                            }
                        }
                        break;
                }
            }
        }
        firstCsvList.push('\n');

    }
    csvRows=firstCsvList.join('\n');
    function downloadCS(){
        var a         =  document.getElementById('a');
        a.href        = 'data:attachment/csv,' + encodeURI(csvRows);
        a.target      = '_blank';
        a.download    = 'myFile.csv';
    }

}