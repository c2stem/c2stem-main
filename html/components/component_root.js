/**
 * Created by hasanm on 5/9/2017.
 */
function load_modules() {
    // load data of all the modules
    conceptual_model_load_data();
    execute_when_ready(load_views, 100);
}

function load_views() {
    // load views of all the modules
    conceptual_model_load_views("concepts");
}

function execute_when_ready(action, wait_period) {
    console.log("execute_when_ready");
    if (!is_ready_modules()) {
        setTimeout(function () {
            execute_when_ready(load_views, wait_period);
        }, wait_period);
    } else {
        action();
    }
}


$(document).ready(function () {
    load_modules();
});


function is_ready_modules() {
    if (!is_ready_cm())
        return false;
    return true;
}