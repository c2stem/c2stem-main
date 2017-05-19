// update the world size on tab open and resize
WorldMorph.prototype.updateSize = function () {
    var clientWidth = this.worldCanvas.clientWidth,
        clientHeight = this.worldCanvas.clientHeight,
        myself = this;

    console.log('updating size to', clientWidth, 'x', clientHeight);
    if (clientWidth && clientHeight && (
            this.worldCanvas.width !== clientWidth ||
            this.worldCanvas.height !== clientHeight)) {

        this.worldCanvas.width = clientWidth;
        this.worldCanvas.height = clientHeight;

        this.setWidth(clientWidth);
        this.setHeight(clientHeight);

        this.children.forEach(function (child) {
            if (child.reactToWorldResize) {
                child.reactToWorldResize(myself.bounds.copy());
            }
        });
    }
};

// Hide cloud button
IDE_Morph.prototype.c2StemCreateControlBar = IDE_Morph.prototype.createControlBar;
IDE_Morph.prototype.createControlBar = function () {
    this.c2StemCreateControlBar();

    this.controlBar.c2StemFixLayout = this.controlBar.fixLayout;
    this.controlBar.fixLayout = function () {
        this.c2StemFixLayout();
        this.cloudButton.hide();
        this.projectButton.setRight(this.cloudButton.right());
    }
}

// Hide cloud button
IDE_Morph.prototype.c2StemToggleAppMode = IDE_Morph.prototype.toggleAppMode;
IDE_Morph.prototype.toggleAppMode = function (appMode) {
    this.c2StemToggleAppMode(appMode);
    this.controlBar.cloudButton.hide();
}

// Load the proper resources from SnapPhysics
IDE_Morph.prototype.resourceURL = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    args.splice(0, 0, 'SnapPhysics');
    return args.join('/');
}

// user name is not stored locally, server checks if connected
Cloud.prototype.reconnect = function (callBack, errorCall) {
    this.login('', '', callBack, errorCall);
};

// disconnect is disabled, called sometimes
Cloud.prototype.disconnect = function () {};