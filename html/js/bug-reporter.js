var BugReporter = {};

BugReporter.enable = function() {
    console.log('Bug reporting enabled!');
    window.onerror = function(_, _, _, _, err) {
        var report = {
            user: c2stem ? c2stem.userRole : null,
            stackTrace: err.stack
        };

        // Make an ajax request to the server containing the bug report
        // TODO
        var req = new XMLHttpRequest();
        req.open('POST', '/SnapCloud/BugReport');
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        req.send(JSON.stringify(report));
        console.log('reported bug!', report);
    };
};

BugReporter.disable = function() {
};


// For testing
document.body.onkeyup = function(e){
    console.error('>>> break stuff');
    asdf;
};
