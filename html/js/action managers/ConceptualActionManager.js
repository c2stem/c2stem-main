/**
 * Created by hasanm on 6/16/2017.
 */
var ConceptualActionManager = new ActionManager();

ConceptualActionManager.addActions(
    'createConcept',
    'deleteConcept',
    'createProperty',
    'deleteProperty',
    'createBehavior',
    'deleteBehavior'
);

ConceptualActionManager._deleteBehavior = function(concept, behavior) {
    return [concept.name, behavior.name, c2stem.task_id, c2stem.module_id];
};

ConceptualActionManager.onDeleteBehavior = function(concept_name, behavior_name, task_id, module_id) {
};

ConceptualActionManager._createBehavior = function(concept, behavior) {
    return [concept.name, behavior.name, c2stem.task_id, c2stem.module_id];
};

ConceptualActionManager.onCreateBehavior = function(concept_name, behavior_name, task_id, module_id) {
};

ConceptualActionManager._deleteProperty = function(concept, property) {
    return [concept.name, property.name, c2stem.task_id, c2stem.module_id];
};

ConceptualActionManager.onDeleteProperty = function(concept_name, property_name, task_id, module_id) {
};

ConceptualActionManager._createProperty = function(concept, property) {
    return [concept.name, property.name, c2stem.task_id, c2stem.module_id];
};

ConceptualActionManager.onCreateProperty = function(concept_name, property_name, task_id, module_id) {
};

ConceptualActionManager._createConcept = function(concept) {
    return [concept.name, c2stem.task_id, c2stem.module_id];
};

ConceptualActionManager.onCreateConcept = function(concept_name, task_id, module_id) {
};

ConceptualActionManager._deleteConcept = function(concept) {
    // Convert the arguments to a serializable format. The returned array
    // will be passed to the `onDeleteConcept` method as arguments
    return [concept.name, c2stem.task_id, c2stem.module_id];
};

ConceptualActionManager.onDeleteConcept = function(concept_name, task_id, module_id) {
    // apply the event given the arguments returned from _deleteConcept
    // TODO
    // console.log("Delete concept", conceptID);
};

///////////////// using the action manager /////////////////
ConceptualActionManager.assignId('conceptual-model');  // this will also register the action manager

// $('#delete-btn').click(function() {
//     var concept = 'some-concept-that-was-deleted';
//     ConceptualActionManager.deleteConcept(concept);
// });