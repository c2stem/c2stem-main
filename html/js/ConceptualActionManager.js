/**
 * Created by hasanm on 6/16/2017.
 */
var ConceptualActionManager = new ActionManager();

ConceptualActionManager.addActions(
    'deleteConcept'
);

ConceptualActionManager._deleteConcept = function(concept) {
    // Convert the arguments to a serializable format. The returned array
    // will be passed to the `onDeleteConcept` method as arguments
    return [concept.elementID];
};

ConceptualActionManager.onDeleteConcept = function(conceptID) {
    // apply the event given the arguments returned from _deleteConcept
    // TODO
    console.log("Delete concept", conceptID);
};

///////////////// using the action manager /////////////////
ConceptualActionManager.assignId('conceptual-model');  // this will also register the action manager

// $('#delete-btn').click(function() {
//     var concept = 'some-concept-that-was-deleted';
//     ConceptualActionManager.deleteConcept(concept);
// });