function C2stem(snapCloudUrl) {
    this.snapCloudUrl = snapCloudUrl || "";
    this.withCredentials = false;
    this.query = this.parseQueryString();
};

C2stem.prototype.login = function (username, password, remember, callback) {
    try {
        var req = new XMLHttpRequest();
        req.open('POST', this.snapCloudUrl + "/SnapCloud/", true);
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.withCredentials = this.withCredentials;
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    callback(null);
                } else {
                    callback(req.responseText || 'Connection refused');
                }
            }
        };
        req.send(JSON.stringify({
            '__h': password && hex_sha512(password),
            '__u': username,
            'remember': remember === true,
        }));
    } catch (err) {
        callback(err || "Could not login");
    }
};

C2stem.prototype.logout = function (callback) {
    try {
        var req = new XMLHttpRequest();
        req.open('GET', this.snapCloudUrl + "/SnapCloud/logout", true);
        req.withCredentials = this.withCredentials;
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    callback(null);
                } else {
                    callback(req.responseText || 'Connection refused');
                }
            }
        };
        req.send();
    } catch (err) {
        callback(err || "Could not logout");
    }
};

C2stem.prototype.parseQueryString = function () {
    var s = window.location.search,
        q = {};

    if (s.length >= 2) {
        s = s.substr(1).split('&');
        for (var i = 0; i < s.length; i++) {
            var b = s[i].split('=');
            q[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
    }

    return q;
}

C2stem.prototype.loadHomeData = function (callback) {
    var res = {
        modules: [{
            id: 'mod1',
            name: "1D motion",
            icon: "img/school-bus.png"
        }, {
            id: 'mod2',
            name: "Relative motion",
            icon: "img/boat.png"
        }, {
            id: 'mod3',
            name: "Gravity",
            icon: "img/plane.png"
        }, {
            id: 'mod4',
            name: "Rocket landing",
            icon: "img/falcon9.png"
        }]
    };

    // hack, to make sure that we are logged in
    this.login(null, null, null, function (err) {
        callback(err, err ? null : res);
    });
}

C2stem.prototype.loadModuleData = function (id, callback) {
    var res;

    if (id === 'mod1') {
        res = {
            id: id,
            name: '1D motion',
            tasks: [{
                id: 'tsk1',
                title: 'Explore the environment'
            }, {
                id: 'tsk2',
                title: 'Challenge problem'
            }]
        };
    } else if (id === 'mod2') {
        res = {
            id: id,
            name: 'Relative motion',
            tasks: [{
                id: 'tsk3',
                title: 'Get the boat across the river'
            }, {
                id: 'tsk4',
                title: 'Challenge problem with chrocodiles'
            }]
        };
    } else {
        res = {
            id: id,
            name: 'Unknown module',
            tasks: []
        }
    }

    callback(null, res);
}

C2stem.prototype.fixupLogout = function () {
    $("#logout").click(function (event) {
        event.preventDefault();
        c2stem.logout(function (err) {
            window.location.href = "login.html";
        });
    });
}

C2stem.prototype.fixupModule = function (id, name) {
    $("#modulelink").attr('href', "module.html?" + $.param({
        id: id,
    })).text(name);
}

C2stem.prototype.fixupHtml = function () {
    $("#taskslink").attr('href', "tasks.html?" + $.param({
        m: this.query.m
    }));
}