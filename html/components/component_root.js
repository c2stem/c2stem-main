/**
 * Created by hasanm on 5/9/2017.
 */
function load_components() {
    // load data of all the modules
    console.log("load_components");
    conceptual_model_load_data();
    execute_when_ready(load_views, 100);
}

function load_views() {
    // load views of all the modules
    console.log("load_views");
    conceptual_model_load_views("tabcm");
}

function execute_when_ready(action, wait_period) {
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
//     load_components();
// });


function is_ready_components() {
    if (!is_ready_cm())
        return false;
    return true;
}