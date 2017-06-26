/**
 * Created by NaveedM on 6/21/2017.
 */
var AssessmentActionManager = new ActionManager();

AssessmentActionManager.addActions(
    'addText',
    'toggleRadioBttn',
    'addObject',
    'deleteObject'
);

AssessmentActionManager._addText= function(text_context, text_id) {
    return [text_context, text_id];
};

AssessmentActionManager.onAddText = function(text_context, text_id) {
    console.log(text_context + text_id);
};

AssessmentActionManager._toggleRadioBttn= function(bttn_id) {
    return [bttn_id];
};

AssessmentActionManager.onToggleRadioBttn = function(bttn_id) {
    console.log(bttn_id);
};

AssessmentActionManager._addObject= function(bttn_id) {
    return [bttn_id];
};

AssessmentActionManager.onAddObject = function(bttn_id) {
    console.log(bttn_id);
};

AssessmentActionManager._deleteObject= function(bttn_id) {
    return [bttn_id];
};

AssessmentActionManager.onDeleteObject = function(bttn_id) {
    console.log(bttn_id);
};


///////////////// using the action manager /////////////////
AssessmentActionManager.assignId('assessment');  // this will also register the action manager
