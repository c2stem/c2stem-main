var c2stem = new C2Stem();
c2stem.fixupLogoutLink();

$( window ).on( "load", function() {
    console.log( "ready!" );

    c2stem.loadTaskData(c2stem.query.id, function (err, res) {
        if(res === null){
            // c2stem.logout(function (err) {
            window.location.href = "login.html";
            // });
            return;
        }
        console.log("loading task",res.id);
        c2stem.task_id = res.id;
        c2stem.module_id = res.parent.id;
        c2stem.mode = c2stem.query.mode;
        TaskViewActionManger.pageLoaded(c2stem.task_id, c2stem.module_id);


        if(c2stem.mode !== null && (c2stem.mode === 'teacher' ))
            $('#reset_to_template').hide();

        c2stem.getUserRole(function () {
            if(c2stem.userRole.role !== 'teacher' && c2stem.mode === 'teacher'){
                c2stem.mode = "";
            }

            $("#dashboard").hide();
            if(c2stem.userRole.role === "teacher" || c2stem.userRole.role !== 'researcher'){
                $("#dashboard").show();
            }

            console.log()
            c2stem.isNewTask(function () {
                console.log("isNewTask:", c2stem.isNewTask);
                c2stem.loadPublicProject(c2stem.task_id, null, false, function (err) {
                    loadTask(err,res);
                });
            });
        });

    });
});

function loadTask(err, res) {

    if (err === "ERROR: Not logged in") {
        window.location.href = "login.html";
    } else if (err && err !== "ERROR: Project not found" ) {
        Materialize.toast(err || 'Could not load tasks');
    } else {
        console.log("c2stem.userTaskData:", c2stem.userTaskData);
        c2stem.fixupModuleLink(res.parent.id, res.parent.name);
        c2stem.fixupTaskLink(res.id, res.name);

        $('#tabs-div').append('<ul class="tabs tabs-transparent"></ul>');

        var tab = null;
        for (var i = 0; i < res.tabs.length; i++) {
            tab = res.tabs[i];
            $("#tabs-div ul").append(`<li class="tab"><a href="#tab${tab.id}" id="tab_${tab.id}">${tab.name}</a></li>`)
            if (tab.type === 'desc') {
                c2stem.addDescriptionTab(tab.id, tab.name, tab.markup);
            } else if (tab.type === 'snap1') {
                c2stem.addSnap1Tab(tab.id, tab.name, tab.template);
            } else if (tab.type === 'snap2') {
                c2stem.addSnap2Tab(tab.id, tab.name);
            } else if (tab.type === 'cm') {
                c2stem.addConcpetualModelingTab(tab.id, tab.name, tab.data);
            }

            var n = document.getElementById("tab_"+tab.id);
            n.tab_name = tab.name;
            n.tab_type = tab.type;
            $("#tab_"+tab.id).click(function (event) {
                var eid = event.currentTarget.id;
                var n = document.getElementById(eid);
                // console.log("tab clicked:", n.tab_name, n.tab_type);
                TaskViewActionManger.switchTab(n.tab_name, n.tab_type);
                // ConceptualActionManager.deleteProperty(selected_concept, selected_property);
            });
        }

        $("#reset_to_template").click(function () {
            var cloud = C2StemCloud;
            TaskViewActionManger.resetTask(c2stem.task_id, c2stem.module_id);
            cloud.deleteUserProgress(c2stem.task_id, function () {
                console.log(c2stem.task_id," reset_to_template successful");
                location.reload();
            }, function (err) {
                console.log(c2stem.task_id,"could not reset_to_template, err:", err);
            });
        });

        $("#logout").click(function () {
            LoginActionManger.logout();
        });

        // $("#ExportSnapBlocks").click(function () {
        //     c2stem.SaveBlocksCache("ExtractedBlocks", function (error) {
        //         if(error === null){
        //             c2stem.loadBlocksCache("ExtractedBlocks", "d.asif.hasan");
        //         }
        //     });
        // });


        $('ul.tabs').tabs(); // visualize the tabs
    }
}
