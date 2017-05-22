console.log("Miklos");

C2Stem.prototype.addSnap1Tab = function (id, name, template) {
    var c2stem = this;

    $("#tabs-div ul").append(`<li class="tab"><a href="#tab${id}">${name}</a></li>`)
    $("body").append(`
        <div class="c2stem-snap1" id="tab${id}">
            <iframe src="mysnap-miklos.html"></iframe>
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
        snapWindow.loadMyProject = function (ide, callback) {
            c2stem.loadPublicProject(snapWindow, ide, template, callback);
        }
    });

    $(snapWindow).on('beforeunload', function () {
        C2StemActions.unregister('snap' + id);
    });
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