var c2stem = new C2Stem();
c2stem.fixupLogout();

c2stem.loadTaskData(c2stem.query.id, function (err, res) {
    if (err === "ERROR: Not logged in") {
        window.location.href = "login.html";
    } else if (err) {
        Materialize.toast(err || 'Could not load tasks');
    } else {
        c2stem.fixupModule(res.parent.id, res.parent.name);
        c2stem.fixupTask(res.id, res.name);
    }
});

var ide = new IDE_Morph();

$(document).ready(function () {
    console.log('ready');

    var canvas = $("#world2").get(0);
    var world = new WorldMorph(canvas, false);

    window.addEventListener(
        "resize",
        function () {
            world.updateSize();
        },
        false
    );

    world.worldCanvas.focus();
    ide.openIn(world);
    // world.updateSize();

    // Resize on tab change ('display' attr set to 'none')
    var detectTabShown = new MutationObserver(function () {
        world.updateSize();
    });
    detectTabShown.observe(document.getElementById('computation2'), {
        attributes: true
    });

    function loop() {
        requestAnimationFrame(loop);
        world.doOneCycle();
    }
    loop();
});

var SNAP_ID = 'computation';
var snap = $("#computation > iframe").get(0);
snap = snap.contentWindow || snap.contentDocument.defaultView;
$(snap).on('load', function () {
    // set the database backend
    snap.SnapCloud.url = location.origin + "/SnapCloud/";

    // Register the computational action manager
    C2StemActions.register(SNAP_ID, snap.SnapActions);

    // Configure SnapActions to route everything through the global manager
    C2StemActions.applyEvent = function (event) {
        if (!event.namespace) { // route all internal events through C2StemActions
            event.namespace = SNAP_ID;
            return C2StemActions.applyEvent(event);
        } else {
            return snap.ActionManager.prototype.applyEvent.call(this, event);
        }
    };
});

$(snap).on('beforeunload', function () {
    C2StemActions.unregister(SNAP_ID);
});