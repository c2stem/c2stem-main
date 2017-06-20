/**
 * Created by hasanm on 6/16/2017.
 */
var TaskViewActionManger = new ActionManager();

TaskViewActionManger.addActions(
    'switchTab',
    'loadView'
);

TaskViewActionManger._switchTab = function(tab_name, tab_type) {
    // Convert the arguments to a serializable format. The returned array
    // will be passed to the `onDeleteConcept` method as arguments
    return [tab_name, tab_type];
};

TaskViewActionManger.onSwitchTab = function(tab_name, tab_type) {
    // apply the event given the arguments returned from _deleteConcept
    // TODO
    // console.log("Delete concept", conceptID);
};

///////////////// using the action manager /////////////////
TaskViewActionManger.assignId('task-view');  // this will also register the action manager


// USAGE - To log an event
// $('#delete-btn').click(function() {
//     SampleActionManager.sampleEvent(concept);
// });