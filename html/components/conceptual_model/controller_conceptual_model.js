/**
 * Created by hasanm on 5/9/2017.
 */


function load_conceptual_model(conceptual_html_element_id, data_path) {
    // load data of all the modules
    console.log("load_conceptual_model from", data_path, " into html elementID: ", conceptual_html_element_id);
    conceptual_model_load_data(data_path, function () {
        conceptual_model_load_views(conceptual_html_element_id);
    });
}

function conceptual_model_load_data(data_path, callback){
    dao_conceptual_model(data_path, callback);
}


function conceptual_model_load_views(parent_id) {
    $('#'+parent_id).load('components/conceptual_model/view_conceptual_model.html', function () {
        //console.log("loading coneptual model into", parent_id);

        transform_cm.init(concepts);
        OnViewLoaded();
    });
}



function handle_property_events(selected_concept, selected_prop_key) {
    var selected_property = selected_concept.properties[selected_prop_key];
    $("#sel_prop_" + selected_concept.elementID + " option[value='"+ selected_prop_key +"']").hide();
    $("#sel_prop_" + selected_concept.elementID + " option[value='']").prop('selected', true);
    var $container_prop_row = $("#row_prop_"+selected_concept.elementID);

    //console.log(selected_prop_key,"selected_property",selected_property);
    var html = new EJS({url: 'components/conceptual_model/templates/template_prop_row.ejs'}).render(selected_property);
    $container_prop_row.append(html);
    selected_property.selected = true;


    var n = document.getElementById("delete_"+selected_property.elementID);

    n.selected_concept = selected_concept;
    n.selected_property = selected_property;
    n.selected_prop_key = selected_prop_key;

    $("#delete_"+selected_property.elementID).click(function (event) {
        var eid = event.currentTarget.id;
        var n = document.getElementById(eid);

        selected_concept = n.selected_concept;
        selected_property = n.selected_property;
        selected_prop_key = n.selected_prop_key;

        $("#"+selected_property.elementID).remove();
        $("#sel_prop_" + selected_concept.elementID + " option[value='"+ selected_prop_key +"']").show();
        selected_property.selected = false;
        //console.log("delete selected_property",selected_property);
        OnModelChanged();

        transform_cm.transform_concept_by_rules(selected_concept, "delete", selected_concept.rules, concepts.environment );
    });


    transform_cm.transform_concept_by_rules(selected_concept, "create", selected_concept.rules, concepts.environment );
}

function handle_behavior_events(selected_concept, selected_behavior_key) {
    var selected_behavior = selected_concept.behaviors[selected_behavior_key];
    $("#sel_be_" + selected_concept.elementID + " option[value='"+ selected_behavior_key +"']").hide();
    $("#sel_be_" + selected_concept.elementID + " option[value='']").prop('selected', true);
    // add prop row
    // check prop delete handler
    // upon delete make prop reappear in the list and delete prop row
    var $container_be_row = $("#row_be_"+selected_concept.elementID);
    var html = new EJS({url: 'components/conceptual_model/templates/template_prop_row.ejs'}).render(selected_behavior);
    $container_be_row.append(html);
    selected_behavior.selected = true;
    //console.log("selected_behavior",selected_behavior);


    var n = document.getElementById("delete_"+selected_behavior.elementID);

    n.selected_concept = selected_concept;
    n.selected_behavior = selected_behavior;
    n.selected_behavior_key = selected_behavior_key;

    n.selected_behavior.block = transform_cm.create_block(n.selected_concept, n.selected_behavior.name, n.selected_behavior.category);

    $("#delete_"+selected_behavior.elementID).click(function () {
        var eid = event.currentTarget.id;
        var n = document.getElementById(eid);

        selected_concept = n.selected_concept;
        selected_behavior = n.selected_behavior;
        selected_behavior_key = n.selected_behavior_key;

        $("#"+selected_behavior.elementID).remove();
        $("#sel_be_" + selected_concept.elementID + " option[value='"+ selected_behavior_key +"']").show();
        selected_behavior.selected = false;
        //console.log("delete selected_behavior",selected_behavior);
        OnModelChanged();

        transform_cm.transform_concept_by_rules(selected_concept, "delete", selected_concept.rules, concepts.environment );
        transform_cm.delete_block(n.selected_concept.sprite, n.selected_behavior.block, false);
    });


    transform_cm.transform_concept_by_rules(selected_concept, "create", selected_concept.rules, concepts.environment );
}

function create_new_concept(selected_concept_key, selected_concept) {
    selected_concept.selected = true;
    //console.log("creating new concept: " + selected_concept);
    data = {};
    data.concept = selected_concept;
    var html = new EJS({url: 'components/conceptual_model/templates/template_concept.ejs'}).render(data);
    var $concept_container = $('#concept_container');
    $concept_container.append(html);

    if(selected_concept.isSprite){
        if(selected_concept.isBuiltIn)
            selected_concept.sprite = transform_cm.show_concept(selected_concept);
        else
            selected_concept.sprite = transform_cm.create_new_sprite(selected_concept);
        transform_cm.transform_concept_by_rules(selected_concept, "create", selected_concept.rules, concepts.environment );
    }

    $("#cm_concepts option[value='"+ selected_concept_key +"']").hide();
    $("#cm_concepts option[value='']").prop('selected', true);

    $("#delete_"+selected_concept.elementID).click(function () {
        $("#"+selected_concept.elementID).remove();
        $("#cm_concepts option[value='"+ selected_concept_key +"']").show();
        selected_concept.selected = false;
        //console.log("delete selected_concept",selected_concept);
        OnModelChanged();
        if(selected_concept.isSprite) {
            transform_cm.transform_concept_by_rules(selected_concept, "delete_all", selected_concept.rules, concepts.environment );
            transform_cm.hide_concept(selected_concept);
        }
    });

    // taking care of those which are preselected
    var pre_selected = false;
    var p = null;
    for (p in selected_concept.properties){
        if(selected_concept.properties[p].selected){
            handle_property_events(selected_concept, p);
            pre_selected = true;
        }
    }
    if(pre_selected)
        OnModelChanged();

    $("#sel_prop_"+selected_concept.elementID).change(function () {
        var selected_prop_key = $("#sel_prop_"+selected_concept.elementID).val();
        handle_property_events(selected_concept, selected_prop_key);
        OnModelChanged();
    });



    $("#sel_be_"+selected_concept.elementID).change(function () {
        var selected_behavior_key = $("#sel_be_"+selected_concept.elementID).val();
        handle_behavior_events(selected_concept, selected_behavior_key);
        OnModelChanged();
    });


    // taking care of those which are preselected
    var pre_selected = false;
    var p = null;
    for (var p in selected_concept.behaviors){
        if(selected_concept.behaviors[p].selected){
            handle_behavior_events(selected_concept, p);
        }
    }
    if(pre_selected)
        OnModelChanged();
}

function check_then_create_concept() {
    var selected_concept_key = $('#cm_concepts').val();
    var selected_concept = null;
    if( selected_concept_key in concepts.environment ){
        selected_concept = concepts.environment[selected_concept_key];
    }else if( selected_concept_key in concepts.agents ){
        selected_concept = concepts.agents[selected_concept_key];
    }
    if(selected_concept !== null){
        create_new_concept(selected_concept_key, selected_concept);
        OnModelChanged();
    }
    return selected_concept;
}

function OnModelChanged() {
    //console.log("OnModelChanged");
    // updateComputationalModel();
}
function OnViewLoaded() {
    populate_view();

    var preselected_models = false;
    for(var k in concepts.environment){
        if(concepts.environment[k].selected) {
            create_new_concept(k, concepts.environment[k]);
            preselected_models = true;
        }
    }
    for(var k in concepts.agents){
        if(concepts.agents[k].selected) {
            create_new_concept(k, concepts.agents[k]);
            preselected_models = true;
        }
    }

    if(preselected_models)
        OnModelChanged();


    $("#cm_create_concept").click(function () {
        check_then_create_concept();
    });
}

function populate_view() {
    var $combo_concepts = $('#cm_concepts');
    if (concepts.environment != undefined && Object.keys(concepts.environment).length > 0) {
        $combo_concepts.append(function () {
            var output = '';
            output += '<optgroup label="Environment">';
            $.each(concepts.environment, function (key, value) {
                output += '<option value="' + key + '">' + value.name + '</option>';
            });
            output += '</optgroup>';
            //console.log("output: " , output)
            return output;
        });
    }
    if (concepts.agents != undefined && Object.keys(concepts.agents).length > 0) {
        $combo_concepts.append(function () {
            var output = '';
            output += '<optgroup label="Agents">';
            $.each(concepts.agents, function (key, value) {
                output += '<option value="' + key + '">' + value.name + '</option>';
            });
            output += '</optgroup>';
            //console.log("output: " , output)
            return output;
        });
    }
}

function is_ready_cm() {
    if (!is_ready_cm_dao())
        return false;
    return true;
}