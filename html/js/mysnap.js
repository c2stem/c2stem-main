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
IDE_Morph.prototype.xcreateControlBar = function () {
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
IDE_Morph.prototype.xtoggleAppMode = function (appMode) {
    this.c2StemToggleAppMode(appMode);
    this.controlBar.cloudButton.hide();
}

// Load the proper resources from SnapPhysics
IDE_Morph.prototype.resourceURL = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    args.splice(0, 0, 'SnapPhysics');
    return args.join('/');
}

IDE_Morph.prototype.setCostume = function(sprite, costume_name){
    console.log(sprite.name, "setting costume:", costume_name);
    for(var i in sprite.costumes.contents){
        if(sprite.costumes.contents[i].name === costume_name){
            sprite.wearCostume(sprite.costumes.contents[0]);
            return;
        }
    }
}

IDE_Morph.prototype.create_new_sprite = function(name) {
    var ide = this;
    var sprite = new SpriteMorph(ide.globalVariables),
        rnd = Process.prototype.reportRandom;

    sprite.name = name;
    sprite.setCenter(ide.stage.center());
    ide.stage.add(sprite);

    // randomize sprite properties
    sprite.setHue(rnd.call(ide, 0, 100));
    sprite.setBrightness(rnd.call(ide, 50, 100));
    sprite.turn(rnd.call(ide, 1, 360));
    sprite.setXPosition(rnd.call(ide, -220, 220));
    sprite.setYPosition(rnd.call(ide, -160, 160));

    ide.sprites.add(sprite);
    ide.corral.addSprite(sprite);
    ide.selectSprite(sprite);
    return sprite;
};

IDE_Morph.prototype.exportSpriteStr = function (sprite) {
    var str = this.serializer.serialize(sprite.allParts());
    str = '<sprites app="'
        + this.serializer.app
        + '" version="'
        + this.serializer.version
        + '">'
        + str
        + '</sprites>';
    return str;
};

IDE_Morph.prototype.hide_primitive = function(cat, prim){
    var ide = this;
    ide.stage.hiddenPrimitives[prim] = true;
    ide.flushBlocksCache(cat);
    ide.refreshPalette();
};
IDE_Morph.prototype.show_primitive = function(cat, prim){
    var ide = this;
    ide.stage.hiddenPrimitives[prim] = false;
    ide.flushBlocksCache(cat);
    ide.refreshPalette();
};


IDE_Morph.prototype.delete_block = function (sprite, blockName, isGlobal) {
    var ide = this;
    var stage = ide.stage;
    if (isGlobal) {
        var b = stage.blocksMatching(blockName);
        var block = b[0].definition;
        var idx = stage.globalBlocks.indexOf(block);
        if (idx !== -1) {
            stage.globalBlocks.splice(idx, 1);
        }
    } else {
        var b = sprite.blocksMatching(blockName);
        var block = b[0].definition;
        var idx = sprite.customBlocks.indexOf(block);
        if (idx !== -1) {
            sprite.customBlocks.splice(idx, 1);
        }
    }
    ide.flushPaletteCache();
    ide.refreshPalette();
};

// this block need to be preexisting
IDE_Morph.prototype.show_block = function(sprite, block, isGlobal){
    var ide = this;
    var stage = ide.stage;
    if(isGlobal)
        stage.globalBlocks.push(block);
    else
        sprite.customBlocks.push(block);

    ide.flushPaletteCache();
    ide.refreshPalette();
};


IDE_Morph.prototype.delete_variable = function (sprite, variable_name, isGlobal) {
    if (isGlobal) {
        var ide = this;
        var stage = ide.stage;
        stage.deleteVariable(variable_name);
    } else {
        //console.log("delete variable local: ", variable_name);
        sprite.deleteVariable(variable_name);
    }
};

IDE_Morph.prototype.add_variable = function(sprite, variable_name, isGlobal){
    if (isGlobal) {
        var ide = this;
        var stage = ide.stage;
        stage.addVariable(variable_name, true);
    } else {
        sprite.addVariable(variable_name, false);
    }
    ide.flushPaletteCache();
    ide.refreshPalette();
};

// user name is not stored locally, server checks if connected
Cloud.prototype.reconnect = function (callBack, errorCall) {
    this.login('', '', callBack, errorCall);
};

// disconnect is disabled, called sometimes
Cloud.prototype.disconnect = function () {};

// ignore setroute
Cloud.prototype.setRoute = function (username) {};

// set the backend database url
// SnapCloud.url = "http://run.c2stem.org/SnapCloud/";