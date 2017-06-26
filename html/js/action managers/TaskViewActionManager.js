/**
 * Created by hasanm on 6/16/2017.
 */
var TaskViewActionManger = new ActionManager();

TaskViewActionManger.addActions(
    'switchTab',
    'pageLoaded',
    'resetTask'
);

TaskViewActionManger._switchTab = function(tab_name, tab_type) {
    return [tab_name, tab_type];
};

TaskViewActionManger.onSwitchTab = function(tab_name, tab_type) {
};

TaskViewActionManger._pageLoaded = function(task_id, module_id) {
    return [task_id, module_id];
};

TaskViewActionManger.onPageLoaded = function(task_id, module_id) {
};


TaskViewActionManger._resetTask = function(task_id, module_id) {
    return [task_id, module_id];
};

TaskViewActionManger.onResetTask = function(task_id, module_id) {
};

///////////////// using the action manager /////////////////
TaskViewActionManger.assignId('task-view');  // this will also register the action manager


// USAGE - To log an event
// $('#delete-btn').click(function() {
//     SampleActionManager.sampleEvent(concept);
// });