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

$(document).ready(function () {
    console.log('ready');

    var canvas = $("#world2").get(0);
    var world = new WorldMorph(canvas, false);

    // update the world size on tab open and resize
    world.updateSize = function() {
        var clientWidth = this.worldCanvas.clientWidth,
            clientHeight = this.worldCanvas.clientHeight,
            myself = this;

        if (!clientWidth || !clientHeight) return;
        console.log('updating size to', clientWidth, 'x', clientHeight);
        //this.worldCanvas.style.position = "absolute";
        //this.worldCanvas.style.left = "0px";
        //this.worldCanvas.style.right = "0px";
        //this.worldCanvas.style.width = "100%";
        //this.worldCanvas.style.height = "100%";

        //if (document.documentElement.scrollTop) {
            //// scrolled down b/c of viewport scaling
            //clientHeight = document.documentElement.clientHeight;
        //}
        //if (document.documentElement.scrollLeft) {
            //// scrolled left b/c of viewport scaling
            //clientWidth = document.documentElement.clientWidth;
        //}
        if (this.worldCanvas.width !== clientWidth) {
            this.worldCanvas.width = clientWidth;
            this.setWidth(clientWidth);
            console.log('setting width...');
        }
        if (this.worldCanvas.height !== clientHeight) {
            this.worldCanvas.height = clientHeight;
            this.setHeight(clientHeight);
            console.log('setting height...');
        }
        this.children.forEach(function (child) {
            if (child.reactToWorldResize) {
                console.log('reacting to resize', myself.bounds.copy());
                child.reactToWorldResize(myself.bounds.copy());
            }
        });
    };
    window.addEventListener(
        "resize",
        function () {
            world.updateSize();
        },
        false
    );

    // Resize on tab change ('display' attr set to 'none')
    var detectTabShown = new MutationObserver(function() {
        world.updateSize();
    });
    detectTabShown.observe(document.getElementById('computation2'), {attributes: true});

    world.updateSize();
    world.worldCanvas.focus();
    new IDE_Morph().openIn(world);

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

