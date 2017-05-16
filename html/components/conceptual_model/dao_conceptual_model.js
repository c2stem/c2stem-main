/**
 * Created by hasanm on 5/10/2017.
 */
var concepts = null;
function dao_conceptual_model() {
    data_path = 'components/conceptual_model/default_concepts.json';
    // data_path = 'components/conceptual_model/default_concepts _preselected.json';
    $.getJSON(data_path, function (data) {
        console.log("conceptual model data:")
        console.log(data);
        concepts = data
        console.log("total agents: ", Object.keys(concepts.agents).length);
    });
}

function is_ready_cm_dao() {
    if (concepts === null)
        return false;
    return true;
}