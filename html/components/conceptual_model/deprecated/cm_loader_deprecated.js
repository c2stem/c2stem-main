/**
 * Created by hasanm on 5/9/2017.
 */
function load_conceptual_model(conceptual_html_element_id, data_path) {
    // load data of all the modules
    console.log("load_conceptual_model from", data_path, " into html elementID: ", conceptual_html_element_id);
    conceptual_model_load_data(data_path);
    execute_when_ready(load_views, 100);
}

function load_views() {
    // load views of all the modules
    console.log("load_views");
    conceptual_model_load_views("tabcm");
}

function execute_when_ready(action, conceptual_html_element_id, wait_period) {
    console.log("execute_when_ready");
    if (!is_ready_components()) {
        setTimeout(function () {
            execute_when_ready(load_views, wait_period);
        }, wait_period);
    } else {
        action();
    }
}


// $(document).ready(function () {
//     load_conceptual_model();
// });


function is_ready_components() {
    if (!is_ready_cm())
        return false;
    return true;
}