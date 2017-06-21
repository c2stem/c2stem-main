/**
 * Created by hasanm on 6/16/2017.
 */
var PeriodicalStateSaver = new ActionManager();

PeriodicalStateSaver.addActions(
    'saveModelState'
);

PeriodicalStateSaver._saveModelState = function() {
    var state = {};
    console.log("Collecting the state of the models");
    var userTaskData = c2stem.collectUserProgressData(false);
    return [userTaskData];
};

PeriodicalStateSaver.onSaveModelState = function(state) {
};

PeriodicalStateSaver.assignId('periodical-state-saver');

var timeLastSaved = new Date().getTime();
C2StemActions.addEventListener(function (event) {
    var curTime = new Date().getTime();
    var timeElasped = curTime - timeLastSaved;
    console.log("timeElasped:",timeElasped);
    // if time elapsed not equal to 1 minute
    if(timeElasped < 10 * 1000)
        return;
    timeLastSaved = curTime;

    // console.log("A Logging Event occured:", event);
    if(event.namespace !== 'periodical-state-saver')
        PeriodicalStateSaver.saveModelState(event);
});