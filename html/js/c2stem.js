function C2Stem(snapCloudUrl) {
    this.snapCloudUrl = snapCloudUrl || "";
    this.withCredentials = false;
    this.query = this.parseQueryString();
};

C2Stem.prototype.login = function (username, password, remember, callback) {
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

C2Stem.prototype.logout = function (callback) {
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

C2Stem.prototype.signup = function (username, email, callback) {
    try {
        var req = new XMLHttpRequest();
        req.open('GET', this.snapCloudUrl + "/SnapCloud/SignUp" +
            '?Username=' + encodeURIComponent(username) +
            '&Email=' + encodeURIComponent(email), true);
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
        callback(err || "Could not register");
    }
};

C2Stem.prototype.parseQueryString = function () {
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

C2Stem.prototype.loadHomeData = function (callback) {
    var res = {
        modules: [{
            id: 'm1',
            name: "1D motion",
            icon: "img/school-bus.png"
        }, {
            id: 'm2',
            name: "Relative motion",
            icon: "img/boat.png"
        }, {
            id: 'm3',
            name: "Gravity",
            icon: "img/plane.png"
        }, {
            id: 'm4',
            name: "Rocket landing",
            icon: "img/falcon9.png"
        }]
    };

    // hack, to make sure that we are logged in
    this.login(null, null, null, function (err) {
        callback(err, err ? null : res);
    });
}

C2Stem.prototype.loadModuleData = function (id, callback) {
    var res;

    if (id === 'm1') {
        res = {
            id: id,
            name: '1D motion',
            tasks: [{
                id: 't1',
                name: 'Explore the environment'
            }, {
                id: 't2',
                name: 'Challenge problem'
            }]
        };
    } else if (id === 'm2') {
        res = {
            id: id,
            name: 'Relative motion',
            tasks: [{
                id: 't3',
                name: 'Get the boat across the river'
            }, {
                id: 't4',
                name: 'Challenge problem with chrocodiles'
            }]
        };
    } else {
        res = {
            id: id,
            name: 'Unknown module',
            tasks: []
        }
    }

    // hack, to make sure that we are logged in
    this.login(null, null, null, function (err) {
        callback(err, err ? null : res);
    });
}

C2Stem.prototype.loadTaskData = function (id, callback) {
    var res;

    if (id === 't1') {
        res = {
            parent: {
                id: 'm1',
                name: '1D motion'
            },
            id: id,
            name: 'Explore the environment',
            tabs: []
        };
    } else if (id === 't2') {
        res = {
            parent: {
                id: 'm1',
                name: '1D motion'
            },
            id: id,
            name: 'Challenge problem',
            tabs: []
        };
    } else if (id === 't3') {
        res = {
            parent: {
                id: 'm2',
                name: 'Relative motion'
            },
            id: id,
            name: 'Get the boat across the river',
            tabs: []
        };
    } else {
        res = {
            parent: {
                id: '',
                name: 'Unknown module'
            },
            id: id,
            name: 'Unknown task',
            tabs: []
        }
    }

    // hack, to make sure that we are logged in
    this.login(null, null, null, function (err) {
        callback(err, err ? null : res);
    });
}

C2Stem.prototype.fixupLogout = function () {
    $("#logout").click(function (event) {
        event.preventDefault();
        c2stem.logout(function (err) {
            window.location.href = "login.html";
        });
    });
}

C2Stem.prototype.fixupModule = function (id, name) {
    $("#modulelink").attr('href', "module.html?" + $.param({
        id: id,
    })).text(name);
}

C2Stem.prototype.fixupTask = function (id, name) {
    $("#tasklink").attr('href', "task.html?" + $.param({
        id: id,
    })).text(name);
}