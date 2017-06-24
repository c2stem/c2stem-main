/**
 * Created by hasanm on 6/16/2017.
 */
var TaskDescriptionActionManger = new ActionManager();

TaskDescriptionActionManger.addActions(
    'submitSolution',
    'pageLoaded'
);

TaskDescriptionActionManger._submitSolution = function(activityID) {
    return [activityID, c2stem.task_id, c2stem.module_id];
};

TaskDescriptionActionManger.onSubmitSolution = function(tab_name, tab_type) {
};

///////////////// using the action manager /////////////////
TaskDescriptionActionManger.assignId('task-description');  // this will also register the action manager

