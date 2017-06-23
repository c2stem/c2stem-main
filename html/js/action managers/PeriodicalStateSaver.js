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


function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var autoLog = debounce(function() {
    console.log("autoLog the state of the model");
    if(!c2stem.saveDataFetchers)
        return;
    var userTaskData = c2stem.collectUserProgressData(false);
    var lg = JSON.stringify(userTaskData);
    if(lastLoggedData === lg){
        console.log("SKIPPING LOGGING MODEL STATE AS THE DATA REMAIN UNCHANGED");
    }else{
        lastLoggedData = lg;
        PeriodicalStateSaver.logModelState(userTaskData);
    }
}, 4000);


var autoSave = debounce(function() {
    console.log("autoSave the state of the model");
    if(!c2stem.saveDataFetchers)
        return;
    c2stem.saveUserProgress();
}, 7000);

C2StemActions.addEventListener(function (event) {
    if(event.namespace === 'periodical-state-saver')
        return;
    autoLog();
    autoSave();
});

