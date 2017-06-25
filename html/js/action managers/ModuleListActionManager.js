/**
 * Created by hasanm on 6/16/2017.
 */
var ModuleListActionManger = new ActionManager();

ModuleListActionManger.addActions(
    'submitSolution',
    'pageLoaded'
);

ModuleListActionManger._pageLoaded = function() {
    return [];
};

ModuleListActionManger.onPageLoaded = function() {
};


ModuleListActionManger._submitSolution = function(module_id) {
    return [module_id];
};

ModuleListActionManger.onSubmitSolution = function() {
};


///////////////// using the action manager /////////////////
ModuleListActionManger.assignId('module-list');  // this will also register the action manager


// USAGE - To log an event
// $('#delete-btn').click(function() {
//     SampleActionManager.sampleEvent(concept);
// });