function C2stem(snapCloudUrl) {
    this.snapCloudUrl = snapCloudUrl || "";
    this.withCredentials = false;
};

C2stem.prototype.login = function (username, password, callback) {
    console.log("login", username, password);
    try {
        var req = new XMLHttpRequest();
        req.open('POST', this.snapCloudUrl + "/SnapCloud/", true);
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.withCredentials = this.withCredentials;
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    var session = req.getResponseHeader('MioCracker')
                        .split(';')[0];
                    callback(null, session);
                } else {
                    callback(req.responseText || 'Connection refused');
                }
            }
        };
        req.send(JSON.stringify({
            '__h': hex_sha512(password),
            '__u': username
        }));
    } catch (err) {
        callback(err || "Could not login");
    }
};