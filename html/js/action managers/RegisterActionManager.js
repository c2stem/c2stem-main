/**
 * Created by hasanm on 6/16/2017.
 */
var RegisterActionManager = new ActionManager();

RegisterActionManager.addActions(
    'Register',
    'pageLoaded'
);

RegisterActionManager._pageLoaded = function() {
    return [];
};

RegisterActionManager.onPageLoaded = function() {
};

RegisterActionManager._Register = function() {
    return [];
};

RegisterActionManager.onRegister = function() {
};

///////////////// using the action manager /////////////////
RegisterActionManager.assignId('Register-page');  // this will also register the action manager
