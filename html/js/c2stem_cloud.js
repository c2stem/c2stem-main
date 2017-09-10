/**
 * Created by hasanm on 6/8/2017.
 */

// Global stuff

var C2StemCloud = new C2Cloud("/SnapCloud/");
console.log(C2StemCloud);
// Cloud /////////////////////////////////////////////////////////////

function C2Cloud(url) {
    this.username = null;
    this.password = null; // hex_sha512 hashed
    this.url = url;
    this.session = null;
    this.limo = null;
    this.route = null;
    this.api = {};
}

C2Cloud.prototype.encodeDict = function (dict) {
    var str = '',
        pair,
        key;
    if (!dict) {return null; }
    for (key in dict) {
        if (dict.hasOwnProperty(key)) {
            pair = encodeURIComponent(key)
                + '='
                + encodeURIComponent(dict[key]);
            if (str.length > 0) {
                str += '&';
            }
            str += pair;
        }
    }
    return str;
};

C2Cloud.prototype.deleteUserProgress = function (projectName, callBack, errorCall) {
    var myself = this;

    myself.callService(
        'deleteProject',
        function (response, url) {
            callBack.call(null, response, url);
        },
        errorCall,
        [
            projectName
        ]
    );
};

C2Cloud.prototype.getData = function (
    service,
    id,
    callBack,
    errorCall
) {
    // id is Username=username&projectName=projectname,
    // where the values are url-component encoded
    // callBack is a single argument function, errorCall take two args
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        var u = this.url + service;
        if(id)
            u = u + '?'
                + id;
        // console.log("making GET request: ", u);
        request.open("GET", u, true);
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.responseText.indexOf('ERROR') === 0) {
                        errorCall.call(
                            this,
                            request.responseText
                        );
                    } else {
                        callBack.call(
                            null,
                            request.responseText
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url + 'Public',
                        'could not connect to:'
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};
C2Cloud.prototype.loadUserProgress = function (
    id,
    callBack,
    errorCall
) {
    // id is Username=username&projectName=projectname,
    // where the values are url-component encoded
    // callBack is a single argument function, errorCall take two args
    var request = new XMLHttpRequest(),
        myself = this;
    console.log("load userprogress url: ", this.url + 'getUserProgress'
        + '?'
        + id);
    try {
        request.open(
            "GET", this.url + 'getUserProgress'
            + '?'
            + id,
            true
        );
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.responseText.indexOf('ERROR') === 0) {
                        errorCall.call(
                            this,
                            request.responseText
                        );
                    } else {
                        callBack.call(
                            null,
                            request.responseText
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url + 'Public',
                        'could not connect to:'
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

C2Cloud.prototype.saveUserProgress = function (projectName, userTaskData, callBack, errorCall) {
    var myself = this,
        userTaskDataString,
        userTaskDataSize;

    userTaskDataString = userTaskData? JSON.stringify(userTaskData): "";
    userTaskDataSize = userTaskDataString? userTaskDataString.length : 0;


    myself.callService(
        'saveUserProgress',
        function (response, url) {
            callBack.call(null, response, url);
        },
        errorCall,
        [
            projectName,
            userTaskDataString,
            userTaskDataString? userTaskDataString.length : 0
        ]
    );

};




C2Cloud.prototype.callService = function (
    serviceName,
    callBack,
    errorCall,
    args
) {
    // both callBack and errorCall are optional two-argument functions
    var request = new XMLHttpRequest(),
        service = c2stem.api[serviceName],
        myself = this,
        stickyUrl,
        postDict;


    if (args && args.length > 0) {
        postDict = {};
        service.parameters.forEach(function (parm, idx) {
            postDict[parm] = args[idx];
        });
    }
    try {
        stickyUrl = this.url +
            '/' +
            service.url;
        request.open(service.method, stickyUrl, true);
        request.withCredentials = true;
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.setRequestHeader('MioCracker', this.session);
        request.setRequestHeader('SESSIONGLUE', this.route);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                var responseList = [];
                if (request.responseText &&
                    request.responseText.indexOf('ERROR') === 0) {
                    errorCall.call(
                        this,
                        request.responseText,
                        'Service:' + ' ' + serviceName
                    );
                    return;
                }
                if (serviceName === 'login') {
                    myself.api = myself.parseAPI(request.responseText);
                }
                if (serviceName === 'getRawProject') {
                    responseList = request.responseText;
                } else {
                    responseList = myself.parseResponse(
                        request.responseText
                    );
                }
                callBack.call(null, responseList, service.url);
            }
        };
        request.send(this.encodeDict(postDict));
    } catch (err) {
        errorCall.call(this, err.toString(), service.url);
    }
};



C2Cloud.prototype.parseResponse = function (src) {
    var ans = [],
        lines;
    if (!src) {return ans; }
    lines = src.split(" ");
    lines.forEach(function (service) {
        var entries = service.split("&"),
            dict = {};
        entries.forEach(function (entry) {
            var pair = entry.split("="),
                key = decodeURIComponent(pair[0]),
                val = decodeURIComponent(pair[1]);
            dict[key] = val;
        });
        ans.push(dict);
    });
    return ans;
};


C2Cloud.prototype.recordTaskModified = function (taskName, study, callBack, errorCall) {
    var myself = this;

    myself.callService(
        'recordTaskModified',
        function (response, url) {
            callBack.call(null, response, url);
        },
        errorCall,
        [
            taskName,
            study
        ]
    );
};


C2Cloud.prototype.recordTaskSubmitted = function (activityID, taskName, study, callBack, errorCall) {
    var myself = this;

    myself.callService(
        'recordTaskSubmitted',
        function (response, url) {
            callBack.call(null, response, url);
        },
        errorCall,
        [
            activityID,
            taskName,
            study
        ]
    );
};

C2Cloud.prototype.recordCurrentTask = function (taskID, study, callBack, errorCall) {
    var myself = this;

    myself.callService(
        'recordCurrentTask',
        function (response, url) {
            callBack.call(null, response, url);
        },
        errorCall,
        [
            taskID,
            study
        ]
    );
};

