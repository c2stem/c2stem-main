/**
 * Created by dasif on 5/14/2017.
 */

transform_cm = {};
transform_cm.init = function(concepts) {
    this.preprocess(concepts);
};

transform_cm.preprocess = function (concepts) {
    var ide = snap.world.children[0];
    var candidateSprites = [];
    for (var s in ide.sprites.contents){
        if(!ide.sprites.contents.hasOwnProperty(s))
            continue;
        var sprite = ide.sprites.contents[s];
        if(sprite.name in concepts.agents){
            candidateSprites.push(sprite);
        }
    }
    for (var s in candidateSprites){
        var sprite = candidateSprites[s];
        var c = concepts.agents[sprite.name];
        // c.sprite = sprite;
        ////console.log("hiding sprite: ", c.name);
        this.hide_concept(c);

        // c.blocks = {};
        // for (var block_id in sprite.customBlocks){
        //     if(sprite.customBlocks.hasOwnProperty(block_id)){
        //         var block = sprite.customBlocks[block_id];
        //         c.blocks[block.spec] = block;
        //     }
        // }
        // for(var b in c.blocks){
        //     transform_cm.delete_block(sprite, c.blocks[b], false);
        // }
        //
        // c.variables = {};
        // sv = sprite.variables.vars;
        // for (var var_name in sprite.variables.allNames()){
        //     if(sprite.variables.vars.hasOwnProperty(var_name)) {
        //         var variable = sprite.variables.vars[var_name];
        //         c.variables[var_name] = variable;
        //     }
        // }
        // for(var b in c.variables){
        //     transform_cm.delete_variable(sprite, c.variables[b], false);
        // }
    }

    // var stage = ide.stage;
    // ////console.log("Pre-existing global blocks");
    // transform_cm.global_blocks = {};
    // for (var block_id in stage.globalBlocks){
    //     var block = stage.globalBlocks[block_id];
    //     var block_name = block.spec;
    //     transform_cm.global_blocks[block_name] = block;
    // }
    // for(var b in transform_cm.global_blocks){
    //     transform_cm.delete_block(null, transform_cm.global_blocks[b], true);
    // }
    //
    // ////console.log("Pre-existing global variables");
    // transform_cm.global_variables = {};
    // var sgv = stage.globalVariables().vars;
    // for (var var_id in sgv){
    //     if(sgv.hasOwnProperty(var_id)) {
    //         var variable = sgv[var_id];
    //         transform_cm.global_variables[var_id] = variable;
    //     }
    // }
    //
    // for(var variable_name in transform_cm.global_variables){
    //     transform_cm.delete_variable(null, variable_name, true);
    // }
};


transform_cm.delete_variable = function (concept, variable_name, isGlobal) {
    var ide = snap.world.children[0];
    var sprite = null;
    if(concept !== null)
        sprite = this.getSpriteOfConcept(concept);
    ide.delete_variable(sprite, variable_name, isGlobal);
};

transform_cm.add_variable = function(concept, variable_name, isGlobal){
    var ide = snap.world.children[0];
    var sprite = null;
    if(concept !== null)
        sprite = this.getSpriteOfConcept(concept);
    ide.add_variable(sprite, variable_name, isGlobal);
};


transform_cm.delete_block = function (concept, block, isGlobal) {
    //console.log("delete block", block, "under sprite:", sprite);
    var ide = snap.world.children[0];
    var sprite = null;
    if(concept !== null)
        sprite = this.getSpriteOfConcept(concept);
    ide.delete_block(sprite, block, isGlobal);
};

// this block need to be preexisting
transform_cm.show_block = function(sprite, block, isGlobal){
    var ide = snap.world.children[0];
    ide.show_block(sprite, block, isGlobal);
};

transform_cm.create_block = function(concept, name, category){
    //console.log("create_block", name, "under category:", category);
    var ide = snap.world.children[0];
    var block_text ='<blocks> <block-definition s="' + name + '" type="command" category="'+category+'"> <header></header> <code></code> <inputs></inputs> </block-definition> </blocks>';
    //console.log("block_text: ", block_text);
    if(concept === null)
        ide.droppedText(block_text);
    else{
        var model = ide.serializer.parse(block_text);
        //console.log("creatng custom block for ", concept.sprite, " with model:", model);
        var sprite = this.getSpriteOfConcept(concept);
        ide.serializer.loadCustomBlocks(sprite, model, false);
        ide.serializer.populateCustomBlocks(sprite, model, false);
        ide.flushPaletteCache();
        ide.refreshPalette();
    }
};


transform_cm.hide_primitive = function(cat, prim){
    var ide = snap.world.children[0];
    ide.hide_primitive(cat, prim);
};

transform_cm.show_primitive = function(cat, prim){
    var ide = snap.world.children[0];
    ide.show_primitive(cat, prim);
};

transform_cm.create_new_sprite = function(concept) {
    var ide = snap.world.children[0];
    ide.create_new_sprite(concept.name);
    return sprite;
};

transform_cm.remove_sprite = function(sprite) {
    var ide = snap.world.children[0];
    ide.removeSprite(sprite);
};

transform_cm.show_concept =function(concept){
    var ide = snap.world.children[0];
    ide.rawOpenSpritesString(concept.sprite_bkup_xml);
};

transform_cm.getSpriteOfConcept=function(concept){
    var ide = snap.world.children[0];
    for (var s in ide.sprites.contents) {
        if(ide.sprites.contents.hasOwnProperty(s)) {
            var sprite;
            sprite = ide.sprites.contents[s];
            if (sprite.name === concept.name) {
                return sprite;
            }
        }
    }
};

transform_cm.hide_concept =function(concept){
    //console.log("tcm hiding concept", concept.name);
    var ide = snap.world.children[0];
    var sprite = this.getSpriteOfConcept(concept);
    if(sprite !== null){
        var costume_name = concept.costume;
        if(costume_name != undefined && costume_name !== null)
            ide.setCostume(sprite, costume_name);
        concept.sprite_bkup_xml = ide.exportSpriteStr(sprite);
        this.remove_sprite(sprite);
    }
    else{
        console.log("hide_concept:","sprite related to concept not found!");
    }
};


transform_cm.transform_concept_by_rules = function(concept, mode, rules, environment_concepts ) {
    ////console.log("plugin_transform_by_rules, mode:", mode, " running for agent:", concept.name);
    for (var r in rules) {
        var rule = rules[r];
        if(rule.map_generated_for == undefined )
            rule.map_generated_for = {};

        var isGenerated = false;
        if(rule.map_generated_for[concept.name] != undefined)
            isGenerated = rule.map_generated_for[concept.name];

        ////console.log("rule:", rule, "isGenerated:", "mode:", mode);
        if (mode === "delete_all") {
            ////console.log("delete_all");
            if (isGenerated) {
                transform_constructs_of_rule(rule, "delete", concept);
                delete rule.map_generated_for[concept.name];
            }
        } else {
            if (!isGenerated) {
                if (isRuleSatisfied(rule, concept, environment_concepts)) {
                    ////console.log("rule satisfied for creation", rule);
                    transform_constructs_of_rule(rule, "create", concept);
                    rule.map_generated_for[concept.name] = true;
                }else{
                    ////console.log("Rule not satisfied");
                }
            } else {
                if (!isRuleSatisfied(rule, concept, environment_concepts)) {
                    ////console.log("rule not satisfied so would delete existing constructs", rule);
                    transform_constructs_of_rule(rule, "delete", concept);
                    delete rule.map_generated_for[concept.name];
                }else{
                    ////console.log("Rule satisfied");
                }
            }
        }

    }
}

function transform_constructs_of_rule(rule, mode, concept) {
    ////console.log("transform_constructs_of_rule: ", rule, "mode:", mode);
    for (var cid in rule.GeneratedConstructs) {
        var c = rule.GeneratedConstructs[cid];
        switch (c.type) {
            case "built_in":
                if (mode === "create") {
                    ////console.log("show primitive:", c.name, " under category:", c.category);
                    transform_cm.show_primitive(c.category, c.name);
                }
                else if (mode === "delete")
                {
                    ////console.log("hide primitive:", c.name, " under category:", c.category);
                    transform_cm.hide_primitive(c.category, c.name);
                }
                break;
            case "custom_variable":
                if (mode === "create") {
                    if(c.isGlobal)
                        transform_cm.add_variable(null, c.name, true);
                    else
                        transform_cm.add_variable(concept, c.name, false);
                }
                else if (mode === "delete")
                {
                    if(c.isGlobal)
                        transform_cm.delete_variable(null, c.name, true);
                    else
                        transform_cm.delete_variable(concept, c.name, false);
                }
                break;
            default:
                ////console.log("transform_constructs_of_rule: rule has unrecognized construct type", rule);
        }
    }
}

function isRuleSatisfied(rule, concept, environment) {
    var pass = true;
    var found = false;
    for (var q in rule.Required) {
        var rq = rule.Required[q];
        ////console.log("checking Required", rq, (rq in agent.properties));
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
            ////console.log("rule reburies constructs which is not present in the agent or environment");
        }
        if (!found)
            pass = false;
    }
    ////console.log("checking rule", rule, "result:", pass);

    return pass;
}


