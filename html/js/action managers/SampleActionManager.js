/**
 * Created by hasanm on 6/16/2017.
 */
var SampleActionManger = new ActionManager();

SampleActionManger.addActions(
    'switchTab',
    'loadView'
);

SampleActionManger._sampleEvent = function(param1, param2) {
    // Convert the arguments to a serializable format. The returned array
    // will be passed to the `onDeleteConcept` method as arguments
    var computed1 = "somthing computed but serializable";
    var computed1 = "somthing computed but serializable";
    return [computed1, computed2];
};

SampleActionManger.onSampleEvent = function(computed1, computed2) {
    // apply the event given the arguments returned from _sampleEvent
    // TODO
    // console.log("Apply sample event");
};

///////////////// using the action manager /////////////////
SampleActionManger.assignId('sample_action_manager');  // this will also register the action manager


// USAGE - To log an event
// $('#delete-btn').click(function() {
//     SampleActionManager.sampleEvent(param1, param2);
// });