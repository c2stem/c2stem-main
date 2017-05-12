function reportError(error) {
    Materialize.toast(error);
}

function c2stemLogin(username, password, callback) {
    try {
        var req = new XMLHttpRequest();
        req.open('POST', "/SnapCloud/", true);
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.withCredentials = true;
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
            '__h': username,
            '__u': password
        }));
    } catch (err) {
        callback(err || "Could not login");
    }
};

window.onload = function () {
    $("#xlogin").click(function () {
        window.location.replace("modules.html");
    });

    if (Cookies.get("remember")) {
        $("#remember").prop('checked', true);
        $("#username").val(Cookies.get("remember"));
        $("#username").next("label").addClass("active");
    }

    $("#remember").click(function () {
        console.log($("#remember").prop('checked'));
        if (!$("#remember").prop('checked')) {
            Cookies.remove("remember");
        }
    });

    $("#login").click(function (event) {
        if ($("#remember").prop('checked') && $("#username").val()) {
            Cookies.set("remember", $("#username").val(), {
                expires: 30
            });
        } else {
            Cookies.remove("remember");
        }

        event.preventDefault();
        c2stemLogin($("#username").val(), $("#password").val(), function (err, session) {
            console.log(err, session);
            if (err || !session) {
                Cookies.remove("session");
                reportError(err);
            } else {
                Cookies.set("session", session, {
                    expires: 1
                });
                $("#form").submit();
            }
        });
    });
};