// update the world size on tab open and resize
WorldMorph.prototype.updateSize = function () {
    var clientWidth = this.worldCanvas.clientWidth,
        clientHeight = this.worldCanvas.clientHeight,
        myself = this;

    //console.log('updating size to', clientWidth, 'x', clientHeight);
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
    //console.log(sprite.name, "setting costume:", costume_name);
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


IDE_Morph.prototype.is_block_exists = function (sprite, blockName, isGlobal) {
    var ide = this;
    var stage = ide.stage;
    if (isGlobal) {
        var b = this.blocksMatching(sprite, blockName, isGlobal);
        if(b === null)
            return false;
        else
            return true;
    } else {
        var b = this.blocksMatching(sprite, blockName, isGlobal);
        // console.log("IDE_Morph.prototype.is_block_exists", blockName, b);
        if(b === null)
            return false;
        else
            return true;
    }
};


SnapSerializer.prototype.populateCustomBlocksFixed = function (
    object,
    element,
    isGlobal,
    fnBlockMatching
) {
    // private
    var myself = this;
    element.children.forEach(function (child, index) {
        var b = object.blocksMatching(child.attributes.s);
        var block = null;
        if(!b && b !== null && b.length > 0)
            block = b[0].definition;
        else{
            console.log("object:", object, "name:", child.attributes.s, isGlobal);
            block = fnBlockMatching(object, child.attributes.s, isGlobal);
        }
        // var idx = object.customBlocks.indexOf(child);
        // if(idx == -1) {
        //     idx = ide.stage.globalBlocks.indexOf(child);
        // }

        // console.log("populateCustomBlocks",child, index, idx);
        console.log("block def",block);
        // index = idx;
        var definition, script, scripts;
        if (child.tag !== 'block-definition') {
            return;
        }
        // definition = isGlobal ? object.globalBlocks[index]
        //     : object.customBlocks[index];
        definition = block;
        // console.log("definition",definition);
        script = child.childNamed('script');
        if (script) {
            definition.body = new Context(
                null,
                script ? myself.loadScript(script) : null,
                null,
                object
            );
            if(definition.names)
                definition.body.inputs = definition.names.slice(0);
        }
        scripts = child.childNamed('scripts');
        if (scripts) {
            definition.scripts = myself.loadScriptsArray(scripts);
        }

        if(definition && definition.names)
            delete definition.names;

        SnapActions.loadCustomBlocks([definition], object);
    });
};



IDE_Morph.prototype.import_block_xml =function(sprite, block_xml){
    // //console.log("importing block, sprite===null:",sprite===null);
    var ide = this;
    block_xml = SnapActions.uniqueIdForImport(block_xml).toString();  // add unique ids
    if(sprite === null) {
        SnapActions.onImportBlocks(block_xml);
    } else {
        // console.log("creating block under sprite:", sprite, "blockXML:",block_xml);
        var model = ide.serializer.parse(block_xml);
        ide.serializer.loadCustomBlocks(sprite, model, false);
        // ide.serializer.populateCustomBlocks(sprite, model, false)
        ide.serializer.populateCustomBlocksFixed(sprite, model, false, this.blocksMatching);
        ide.flushPaletteCache();
        ide.refreshPalette();
    }
}


IDE_Morph.prototype.blocksMatching = function (sprite, blockName, isGlobal) {
    var ide = this;
    var stage = ide.stage;
    var customBlocks = null;
    if (isGlobal) {
        customBlocks = stage.globalBlocks;
    } else {
        customBlocks = sprite.customBlocks;
    }

    if(customBlocks == null)
        return null;

    if(customBlocks.length == 0)
        return null;

    var block = null;

    for(var b in customBlocks){
        if(customBlocks.hasOwnProperty(b)){
            if(customBlocks[b].spec === blockName)
                return customBlocks[b];
        }
    }

    return block;
}

IDE_Morph.prototype.delete_block = function (sprite, blockName, isGlobal) {
    var ide = this;
    var stage = ide.stage;
    var exportedString = null;
    if (isGlobal) {
        // var b = stage.blocksMatching(blockName);
        // if(b.length == 0)
        //     return;
        // var block = b[0].definition;
        var block = this.blocksMatching(sprite, blockName, isGlobal);
        exportedString = ide.serializer.serialize(block);
        var idx = stage.globalBlocks.indexOf(block);
        if (idx !== -1) {
            stage.globalBlocks.splice(idx, 1);
        }
    } else {
        // var b = sprite.blocksMatching(blockName);
        // // console.log("IDE_Morph.prototype.delete_block", b);
        // if(b.length == 0)
        //     return;
        // var block = b[0].definition;
        var block = this.blocksMatching(sprite, blockName, isGlobal);
        exportedString = ide.serializer.serialize(block);
        var idx = sprite.customBlocks.indexOf(block);
        if (idx !== -1) {
            sprite.customBlocks.splice(idx, 1);
        }
    }
    ide.flushPaletteCache();
    ide.refreshPalette();
    return exportedString;
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
        if(stage.isVariableNameInUse(variable_name))
            stage.deleteVariable(variable_name);
    } else {
        ////console.log("delete variable local: ", variable_name);
        if(sprite.isVariableNameInUse(variable_name))
            sprite.deleteVariable(variable_name);
    }
};

IDE_Morph.prototype.add_variable = function(sprite, variable_name, isGlobal){
    var ide = this;
    if (isGlobal) {
        var stage = ide.stage;
        // if(stage.isVariableNameInUse(variable_name)) {
            stage.addVariable(variable_name, true);
            console.log("global variable added");
        // }
        // else{
        //     console.log("global variable name in use: ", variable_name);
        //     return;
        // }
    } else {
        // if(!sprite.isVariableNameInUse(variable_name))
            sprite.addVariable(variable_name, false);
        // else
        //     return;
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

// Fix the custom block editor size on initial open
BlockEditorMorph.prototype.updateDefinition = function (silent) {
    var head, ide,
        pos = this.body.contents.position(),
        element,
        myself = this;

    this.definition.receiver = this.target; // only for serialization
    this.definition.spec = this.prototypeSpec();
    this.definition.declarations = this.prototypeSlots();
    this.definition.variableNames = this.variableNames();
    this.definition.scripts = [];
    // c2stem change: start
    if (this.bounds.area()) {
        this.definition.editorDimensions = this.bounds.copy();
    }
    // c2stem change: end
    this.definition.cachedIsRecursive = null; // flush the cache, don't update

    this.body.contents.children.forEach(function (morph) {
        if (morph instanceof PrototypeHatBlockMorph) {
            head = morph;
        } else if (morph instanceof BlockMorph ||
                (morph instanceof CommentMorph && !morph.block)) {
            element = morph.fullCopy();
            element.parent = null;
            element.setPosition(morph.position().subtract(pos));
            myself.definition.scripts.push(element);
        }
    });

    if (head) {
        this.definition.category = head.blockCategory;
        this.definition.type = head.type;
        if (head.comment) {
            this.definition.comment = head.comment.fullCopy();
            this.definition.comment.block = true; // serialize in short form
        } else {
            this.definition.comment = null;
        }
    }

    this.definition.body = this.context(head);

    if (!silent) {
        this.refreshAllBlockInstances();

        ide = this.target.parentThatIsA(IDE_Morph);
        ide.flushPaletteCache();
        ide.refreshPalette();
    }
};

