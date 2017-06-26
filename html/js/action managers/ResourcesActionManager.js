/**
 * Created by hasanm on 6/16/2017.
 */
var ResourcesActionManager = new ActionManager();

ResourcesActionManager.addActions(
    'clicked'
);

ResourcesActionManager._clicked = function(item_id) {
    return [item_id];
};

ResourcesActionManager.onClicked = function() {
};

///////////////// using the action manager /////////////////
ResourcesActionManager.assignId('Resources');  // this will also register the action manager
