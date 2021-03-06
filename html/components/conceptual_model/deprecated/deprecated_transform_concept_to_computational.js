/**
 * Created by dasif on 5/14/2017.
 */

var id_snap = 'snapframe';
var backups = {};
function updateComputationalModel() {
    agents = concepts.agents;
    environment = concepts.environment;
    rules = concepts.rules;
    //console.log("Agents");
    //console.log(agents);

    var str = snap.export_project_to_xml_str();
    // //console.log("str");
    // //console.log(str);
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(str, "text/xml");

    for (var key in agents) {
        // //console.log(agents[key]);
        plugin_agent(xmlDoc, agents[key])
    }
    plugin_environment_variables(xmlDoc, environment);

    // //console.log("convertedSTR");
    var convertedSTR = new XMLSerializer().serializeToString(xmlDoc);
    // //console.log(convertedSTR);
    load_project_xml(convertedSTR);

    // //console.log(JSON.stringify(AgentStates));
    // var xml = ejs.render({data: AgentStates});
    // //console.log("xml: ", xml);
    // load_project_xml(xml);
}

function plugin_environment_variables(xmlDoc, environment) {
    var parentNode = xmlDoc.getElementsByTagName("project")[0];
    // //console.log("plugin_environment_variables, parentNode: ", parentNode);
    var parent = getChildByTag(xmlDoc.getElementsByTagName("project")[0], "variables");
    for (var key in environment) {
        var e = environment[key];
        //console.log("e: ", e);
        if (e.selected) {
            for (var p in e.properties) {
                if (e.properties[p].selected) {
                    var id = e.name + "_p_" + e.properties[p].name;
                    var bkup = null;
                    if (id in backups)
                        bkup = backups[id];
                    //console.log(id,"bkup: ", bkup);
                    //console.log("plugin_properties: ", e.properties[p]);
                    plugin_properties_direct(xmlDoc, parent, e.properties[p], bkup);
                }
                else {
                    //console.log("xml_remove_property: ", e.properties[p]);
                    // xml_remove_property(e.name, parentNode, e.properties[p].name);
                    xml_remove_property_direct(e.name, parent, e.properties[p].name)
                }
            }
        }
        else if (e.selected == false) {
            for (var p in e.properties) {
                xml_remove_property_direct(e.name, parent, e.properties[p].name)
            }
        }
    }
}

function plugin_agent(xmlDoc, agent) {
    var agentNode = getExistingNode(xmlDoc, "sprite", "name", agent.name);
    if (agentNode === null) {
        // create new agent
        if (agent.selected) {
            var id = agent.name;
            var bkup = null;
            if (id in backups)
                bkup = backups[id];
            if (bkup == null) {
                agentNode = xmlDoc.createElement("sprite");
                agentNode.setAttribute("name", agent.name);
                // blocks
                var blocks = xmlDoc.createElement("blocks");
                agentNode.appendChild(blocks);
                var variables = xmlDoc.createElement("variables");
                agentNode.appendChild(variables);
                var scripts = xmlDoc.createElement("scripts");
                agentNode.appendChild(scripts);

                agent.sprite = snap.create_new_sprite(agent);
            }
            else {
                //console.log("using bkup agent: ");
                //console.log(bkup);
                agentNode = bkup;
            }
            xmlDoc.getElementsByTagName("sprites")[0].appendChild(agentNode);
        } else
            return;
    } else {
        // remove existing agent
        if (agent.selected == false) {

            plugin_transform_by_rules(xmlDoc, agent, agentNode, mode = "delete_all");
            snap.remove_sprite(agent.sprite);


            // // remove properties
            // for (var p in agent.properties) {
            //     // if (agent.properties[p].selected)
            //     xml_remove_property(agent.name, agentNode, agent.properties[p].name);
            // }
            //
            // // remove behaviors
            // for (var b in agent.behaviors) {
            //     // if (agent.behaviors[b].selected)
            //     xml_remove_behavior(agent.name, agentNode, agent.behaviors[b].name);
            // }
            var id = agent.name;
            backups[id] = agentNode;
            //console.log("backing up, id: " + id + " agent: ");
            //console.log(agentNode);
            agentNode.parentNode.removeChild(agentNode);
            return;
        }
    }

    // handle transformation using rules
    plugin_transform_by_rules(xmlDoc, agent, agentNode, mode = "normal");

    /*
    // transform properties
    for (var p in agent.properties){
        if (agent.properties[p].selected) {
            var id = agent.name + "_p_" + agent.properties[p].name;
            var bkup = null;
            if (id in backups)
                bkup = backups[id];
            plugin_properties(xmlDoc, agentNode, agent.properties[p], bkup);
        }
        else {
            xml_remove_property(agent.name, agentNode, agent.properties[p].name);
        }
    }
    // transform behaviors
    for (var b in agent.behaviors) {
        if (agent.behaviors[b].selected) {
            var id = agent.name + "_b_" + agent.behaviors[b].name;
            var bkup = null;
            if (id in backups)
                bkup = backups[id];
            plugin_behaviors(xmlDoc, agentNode, agent.behaviors[b], bkup)
        }
        else {
            xml_remove_behavior(agent.name, agentNode, agent.behaviors[b].name);
        }
    }
    */

}

function plugin_transform_by_rules(xmlDoc, agent, agnetNode, mode ) {
    console.log("plugin_transform_by_rules, mode:", mode, " running for agent:", agent.name);
    for (var r in rules) {
        var rule = rules[r];
        if(rule.map_generated_for == undefined )
            rule.map_generated_for = {};

        var isGenerated = false;
        if(rule.map_generated_for[agent.name] != undefined)
            isGenerated = rule.map_generated_for[agent.name];

        console.log("rule:", rule, "isGenerated:", isGenerated);
        if (mode === "delete_all") {
            if (isGenerated) {
                transform_constructs_of_rule(xmlDoc, agnetNode, rule, mode = "delete");
                delete rule.map_generated_for[agent.name];
            }
        } else {
            if (!isGenerated) {
                if (isRuleSatisfied(rule, agent)) {
                    console.log("rule satisfied for creation", rule);
                    transform_constructs_of_rule(xmlDoc, agnetNode, rule, mode = "create");
                    rule.map_generated_for[agent.name] = true;
                }
            } else {
                if (!isRuleSatisfied(rule, agent)) {
                    console.log("rule not satisfied so would delete existing constructs", rule);
                    transform_constructs_of_rule(xmlDoc, agnetNode, rule, mode = "delete");
                    delete rule.map_generated_for[agent.name];
                }
            }
        }

    }
}

function transform_constructs_of_rule(xmlDoc, agentNode, rule, mode) {
    console.log("transform_constructs_of_rule: ", rule, "mode:", mode);
    for (var cid in rule.GeneratedConstructs) {
        var c = rule.GeneratedConstructs[cid];
        switch (c.type) {
            case "built_in":
                if (mode === "create") {
                    console.log("show primitive:", c.name, " under category:", c.category);
                    snap.show_primitive(c.category, c.name);
                }
                else if (mode === "delete")
                {
                    console.log("hide primitive:", c.name, " under category:", c.category);
                    snap.hide_primitive(c.category, c.name);
                }
                break;
            default:
                console.log("transform_constructs_of_rule: rule has unrecognized construct type", rule);
        }
    }
}

function isRuleSatisfied(rule, agent) {
    var pass = true;
    var found = false;
    for (var q in rule.Required) {
        var rq = rule.Required[q];
        //console.log("checking Required", rq, (rq in agent.properties));
        if (rq in agent.behaviors) {
            found = true;
            if (!agent.behaviors[rq].selected) {
                pass = false;
            }
        } else if (rq in agent.properties) {
            found = true;
            if (!agent.properties[rq].selected) {
                pass = false;
            }
        } else {
            for (var e in environment) {
                if (environment[e].selected) {
                    var a = environment[e]
                    if (rq in a.behaviors) {
                        found = true;
                        if (!a.behaviors[rq].selected) {
                            pass = false;
                        }
                    } else if (rq in a.properties) {
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


function xml_remove_property(agentName, agentNode, propertyName) {
    var e = getExistingNode(agentNode, "variable", "name", propertyName)
    if (!(e === null)) {
        agentNode.getElementsByTagName("variables")[0].removeChild(e);
        var id = agentName + "_p_" + propertyName;
        backups[id] = e;
        //console.log("backing up, id: " + id + " property: ");
        //console.log(e);
    }
}

function xml_remove_property_direct(agentName, parent, propertyName) {
    var e = getChildByName(parent, propertyName);
    //console.log(parent, "xml_remove_property_direct", propertyName, e);
    // var e = getExistingNode(parent, "variable", "name", propertyName)
    if (!(e === null)) {
        // parent.getElementsByTagName("variables")[0].removeChild(e);
        parent.removeChild(e);
        var id = agentName + "_p_" + propertyName;
        backups[id] = e;
        //console.log("backing up, id: " + id + " property: ");
        //console.log(e);
    }
}

function xml_remove_behavior(agentName, agentNode, behaviorName) {
    var e = getExistingNode(agentNode, "block-definition", "s", behaviorName);
    if (!(e === null)) {
        agentNode.getElementsByTagName("blocks")[0].removeChild(e);
        var id = agentName + "_b_" + behaviorName;
        backups[id] = e;
        //console.log("backing up, id: " + id + " behavior: ");
        //console.log(e);
    }
}


function plugin_properties(xmlDoc, agentNode, property, bkup) {
    var node = getExistingNode(agentNode, "variable", "name", property.name);
    if (node === null) {
        if (bkup == null) {
            node = xmlDoc.createElement("variable");
            node.setAttribute("name", property.name);
            var nodeValue = xmlDoc.createElement("l");
            nodeValue.nodeValue = 0;
            node.appendChild(nodeValue);
        } else {
            //console.log("using bkup property: ");
            //console.log(bkup);
            node = bkup;
        }
        agentNode.getElementsByTagName("variables")[0].appendChild(node);
    }
}
function getChildByTag(parent, tag) {
    var x = parent.childNodes;
    for (var i = 0; i < x.length; i++) {
        if (x[i].tagName === tag)
            return x[i];
    }
    return null;
}
function getChildByName(parent, name) {
    var x = parent.childNodes;
    for (var i = 0; i < x.length; i++) {
        if (x[i].getAttribute("name") === name)
            return x[i];
    }
    return null;
}
function plugin_properties_direct(xmlDoc, parent, property, bkup) {
    var node = getChildByName(parent, property.name);
    if (node === null) {
        if (bkup == null) {
            node = xmlDoc.createElement("variable");
            node.setAttribute("name", property.name);
            var nodeValue = xmlDoc.createElement("l");
            nodeValue.nodeValue = 0;
            node.appendChild(nodeValue);
        } else {
            //console.log("using bkup property: ");
            //console.log(bkup);
            node = bkup;
        }
        parent.appendChild(node);
    }
}


function plugin_behaviors(xmlDoc, agentNode, behavior, bkup) {
    var node = getExistingNode(agentNode, "block-definition", "s", behavior.name);
    if (node === null) {
        if (bkup == null) {
            node = xmlDoc.createElement("block-definition");
            node.setAttribute("s", behavior.name);
            node.setAttribute("type", "command");
            node.setAttribute("category", "other");

            node.appendChild(xmlDoc.createElement("header"));
            node.appendChild(xmlDoc.createElement("code"));
            node.appendChild(xmlDoc.createElement("inputs"));
        } else {
            //console.log("using bkup behavior: ");
            //console.log(bkup);
            node = bkup;
        }
        agentNode.getElementsByTagName("blocks")[0].appendChild(node);
    }
}

function getExistingNode(xmlDoc, nodeType, attrName, attrValue) {
    var agents = xmlDoc.getElementsByTagName(nodeType);
    for (var i = 0; i < agents.length; i++)
        if (agents[i].getAttribute(attrName) === attrValue)
            return agents[i];
    return null;
}

function load_project_xml(text) {
    if(true)
        return;
    console.log("load_project_xml");
    return snap.load_project_xml(text);
}
