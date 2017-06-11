/**
 * Created by hasanm on 5/10/2017.
 */
var concepts = null;
function dao_conceptual_model(data_path, callback) {
    if (data_path == undefined || data_path === null) {
        // data_path = 'components/conceptual_model/default_concepts.json';
        data_path = 'components/conceptual_model/concepts/default_concepts_preselected.json';
        // data_path = 'components/conceptual_model/default_concepts_no_environment.json';
    }else{
        data_path = 'components/conceptual_model/concepts/' + data_path + ".json";
    }
    $.getJSON(data_path, function (data) {
        //console.log("conceptual model data:")
        //console.log(data);
        concepts = data;
        if(callback !== null)
            callback(data);
        // console.log("total agents: ", Object.keys(concepts.agents).length);
    }).error(function(jqXHR, textStatus, errorThrown) {
        console.log("error " + textStatus);
        //console.log("incoming Text " + jqXHR.responseText);
    });
}

function is_ready_cm_dao() {
    if (concepts === null)
        return false;
    return true;
}