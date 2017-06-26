/**
 * Created by hasanm on 6/16/2017.
 */
var LoginActionManger = new ActionManager();

LoginActionManger.addActions(
    'login',
    'pageLoaded'
);

LoginActionManger._pageLoaded = function() {
    return [];
};

LoginActionManger.onPageLoaded = function() {
};

LoginActionManger._login = function() {
    return [];
};

LoginActionManger.onLogin = function() {
};

///////////////// using the action manager /////////////////
LoginActionManger.assignId('login-page');  // this will also register the action manager
