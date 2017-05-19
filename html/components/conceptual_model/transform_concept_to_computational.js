/**
 * Created by dasif on 5/14/2017.
 */

transform_cm = {};
transform_cm.init = function(concepts) {
    this.preprocess(concepts);
};

transform_cm.preprocess = function (concepts) {
    var ide = snap.world.children[0];
    console.log("Pre-existing sprites");
    for (var s in ide.sprites.contents){
        var sprite = ide.sprites.contents[s];
        console.log(sprite.name);
        if(sprite.name in concepts.agents){
            c = concepts.agents[sprite.name];
            c.sprite = sprite;
            console.log("hiding sprite: ", c.name);
            this.hide_sprite(c);

            c.blocks = {};
            for (var block_id in sprite.customBlocks){
                var block = sprite.customBlocks[block_id];
                c.blocks[block.name] = block;
            }

            c.variables = {};
            for (var var_name in sprite.variables.allNames()){
                var variable = sprite.variables.vars[var_name];
                c.variables[var_name] = variable;
            }
        }
    }
    console.log("Pre-existing blocks");
    for (var s in ide.sprites.contents){
        var sprite = ide.sprites.contents[s];
        if(sprite.name in concepts.agents){
            c = concepts.agents[sprite.name];
            c.sprite = sprite;
            console.log("hiding sprite: ", c.name);
            this.hide_sprite(c);
        }
    }
};

transform_cm.delete_block = function (sprite, block, isGlobal) {
    var ide = snap.world.children[0];
    var stage = snap.stage;
    if (isGlobal) {
        idx = stage.globalBlocks.indexOf(block);
        if (idx !== -1) {
            stage.globalBlocks.splice(idx, 1);
        }
    } else {
        idx = sprite.customBlocks.indexOf(block);
        if (idx !== -1) {
            sprite.customBlocks.splice(idx, 1);
        }
    }
    ide.flushPaletteCache();
    ide.refreshPalette();
};

// this block need to be preexisting
transform_cm.show_block = function(sprite, block, isGlobal){
    var ide = snap.world.children[0];
    var stage = snap.stage;
    if(isGlobal)
        stage.globalBlocks.push(block);
    else
        sprite.customBlocks.push(definition);

    ide.flushPaletteCache();
    ide.refreshPalette();
};

transform_cm.hide_primitive = function(cat, prim){
    var ide = snap.world.children[0];
    ide.stage.hiddenPrimitives[prim] = true;
    ide.flushBlocksCache(cat);
    ide.refreshPalette();
};
transform_cm.show_primitive = function(cat, prim){
    var ide = snap.world.children[0];
    ide.stage.hiddenPrimitives[prim] = false;
    ide.flushBlocksCache(cat);
    ide.refreshPalette();
};

transform_cm.create_new_sprite = function(concept) {
    var ide = snap.world.children[0];
    var sprite = new SpriteMorph(ide.globalVariables),
        rnd = Process.prototype.reportRandom;

    sprite.name = concept.name;
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

transform_cm.remove_sprite = function(sprite) {
    var ide = snap.world.children[0];
    ide.removeSprite(sprite);
};

transform_cm.show_sprite =function(concept){
    if(concept.sprite != undefined && concept.sprite !== null ){
        var ide = snap.world.children[0];
        var sprite = concept.sprite;
        ide.stage.add(sprite);
        ide.sprites.add(sprite);
        ide.corral.addSprite(sprite);
        ide.selectSprite(sprite);
        return sprite;
    }
};

transform_cm.hide_sprite =function(concept){
    this.remove_sprite(concept.sprite);
};


transform_cm.transform_concept_by_rules = function(concept, mode, rules, environment_concepts ) {
    console.log("plugin_transform_by_rules, mode:", mode, " running for agent:", concept.name);
    for (var r in rules) {
        var rule = rules[r];
        if(rule.map_generated_for == undefined )
            rule.map_generated_for = {};

        var isGenerated = false;
        if(rule.map_generated_for[concept.name] != undefined)
            isGenerated = rule.map_generated_for[concept.name];

        console.log("rule:", rule, "isGenerated:", "mode:", mode);
        if (mode === "delete_all") {
            console.log("delete_all");
            if (isGenerated) {
                transform_constructs_of_rule(rule, "delete");
                delete rule.map_generated_for[concept.name];
            }
        } else {
            if (!isGenerated) {
                if (isRuleSatisfied(rule, concept, environment_concepts)) {
                    console.log("rule satisfied for creation", rule);
                    transform_constructs_of_rule(rule, "create");
                    rule.map_generated_for[concept.name] = true;
                }else{
                    console.log("Rule not satisfied");
                }
            } else {
                if (!isRuleSatisfied(rule, concept, environment_concepts)) {
                    console.log("rule not satisfied so would delete existing constructs", rule);
                    transform_constructs_of_rule(rule, "delete");
                    delete rule.map_generated_for[concept.name];
                }else{
                    console.log("Rule satisfied");
                }
            }
        }

    }
}

function transform_constructs_of_rule(rule, mode) {
    console.log("transform_constructs_of_rule: ", rule, "mode:", mode);
    for (var cid in rule.GeneratedConstructs) {
        var c = rule.GeneratedConstructs[cid];
        switch (c.type) {
            case "built_in":
                if (mode === "create") {
                    console.log("show primitive:", c.name, " under category:", c.category);
                    transform_cm.show_primitive(c.category, c.name);
                }
                else if (mode === "delete")
                {
                    console.log("hide primitive:", c.name, " under category:", c.category);
                    transform_cm.hide_primitive(c.category, c.name);
                }
                break;
            default:
                console.log("transform_constructs_of_rule: rule has unrecognized construct type", rule);
        }
    }
}

function isRuleSatisfied(rule, concept, environment) {
    var pass = true;
    var found = false;
    for (var q in rule.Required) {
        var rq = rule.Required[q];
        //console.log("checking Required", rq, (rq in agent.properties));
        if (concept.behaviors != undefined && rq in concept.behaviors) {
            found = true;
            if (!concept.behaviors[rq].selected) {
                pass = false;
            }
        } else if (concept.properties != undefined && rq in concept.properties) {
            found = true;
            if (!concept.properties[rq].selected) {
                pass = false;
            }
        } else if(environment != undefined && environment !== null) {
            for (var e in environment) {
                if (environment[e].selected) {
                    var a = environment[e]
                    if (a.behaviors != undefined && rq in a.behaviors) {
                        found = true;
                        if (!a.behaviors[rq].selected) {
                            pass = false;
                        }
                    } else if (a.properties != undefined && rq in a.properties) {
                        found = true;
                        if (!a.properties[rq].selected) {
                            pass = false;
                        }
                    }
                }
            }
            //console.log("rule reburies constructs which is not present in the agent or environment");
        }
        if (!found)
            pass = false;
    }
    //console.log("checking rule", rule, "result:", pass);

    return pass;
}


