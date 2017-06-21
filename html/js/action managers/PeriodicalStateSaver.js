/**
 * Created by hasanm on 6/16/2017.
 */
var PeriodicalStateSaver = new ActionManager();

PeriodicalStateSaver.addActions(
    'logModelState'
);

var lastLoggedData = "";
PeriodicalStateSaver._logModelState = function(state) {
    return [state];
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
    // if time elapsed equal to 10 seconds
    if(timeElasped > 10 * 1000){
        timeLastLogged = curTime;
        var userTaskData = c2stem.collectUserProgressData(false);
        var lg = JSON.stringify(userTaskData);
        if(lastLoggedData === lg){
            console.log("SKIPPING LOGGING MODEL STATE AS THE DATA REMAIN UNCHANGED");
        }else{
            lastLoggedData = lg;
            PeriodicalStateSaver.logModelState(userTaskData);
        }
    }

    // auto saving the model state
    curTime = new Date().getTime();
    timeElasped = curTime - timeLastSaved;
    console.log("autosave timeElasped:",timeElasped);
    // if time elapsed equal to 30 seconds
    if(timeElasped > 30 * 1000){
        timeLastSaved = curTime;
        c2stem.saveUserProgress();
    }
});