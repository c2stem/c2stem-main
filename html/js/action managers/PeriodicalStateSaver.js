/**
 * Created by hasanm on 6/16/2017.
 */
var PeriodicalStateSaver = new ActionManager();

PeriodicalStateSaver.addActions(
    'logModelState'
);

PeriodicalStateSaver._logModelState = function() {
    var state = {};
    console.log("Collecting the state of the models");
    var userTaskData = c2stem.collectUserProgressData(false);
    return [userTaskData];
};

PeriodicalStateSaver.onLogModelState = function(state) {
};

PeriodicalStateSaver.assignId('periodical-state-saver');

var timeLastLogged = new Date().getTime();
var timeLastSaved = new Date().getTime();
C2StemActions.addEventListener(function (event) {
    if(event.namespace === 'periodical-state-saver')
        return;
    // loging the model state
    var curTime = new Date().getTime();
    var timeElasped = curTime - timeLastLogged;
    console.log("log timeElasped:",timeElasped);
    // if time elapsed not equal to 1 minute
    if(timeElasped > 10 * 1000){
        timeLastLogged = curTime;

            PeriodicalStateSaver.logModelState(event);
    }

    // auto saving the model state
    curTime = new Date().getTime();
    timeElasped = curTime - timeLastSaved;
    console.log("autosave timeElasped:",timeElasped);
    // if time elapsed not equal to 1 minute
    if(timeElasped > 63 * 1000){
        timeLastSaved = curTime;
        c2stem.saveUserProgress();
    }
});