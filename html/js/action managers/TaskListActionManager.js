/**
 * Created by hasanm on 6/16/2017.
 */
var TaskListActionManger = new ActionManager();

TaskListActionManger.addActions(
    'pageLoaded'
);

TaskListActionManger._pageLoaded = function(module_id) {
    return [module_id];
};

TaskListActionManger.onPageLoaded = function(module_id) {
};

///////////////// using the action manager /////////////////
TaskListActionManger.assignId('task-list');  // this will also register the action manager


// USAGE - To log an event
// $('#delete-btn').click(function() {
//     SampleActionManager.sampleEvent(concept);
// });