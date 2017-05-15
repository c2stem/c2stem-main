function C2stem(snapCloudUrl) {
    this.snapCloudUrl = snapCloudUrl || "";
    this.withCredentials = false;
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
    console.log("logout");
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

C2stem.prototype.getModules = function (callback) {
    var modules = [{
        id: 'mod1',
        title: "1D motion",
        icon: "img/school-bus.png"
    }, {
        id: 'mod2',
        title: "Relative motion",
        icon: "img/boat.png"
    }, {
        id: 'mod3',
        title: "Gravity",
        icon: "img/plane.png"
    }, {
        id: 'mod4',
        title: "Rocket landing",
        icon: "img/falcon9.png"
    }];

    callback(null, modules);
}