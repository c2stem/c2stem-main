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

    $("#form").submit(function (event) {
        if ($("#remember").prop('checked') && $("#username").val()) {
            Cookies.set("remember", $("#username").val(), {
                expires: 30
            });
        } else {
            Cookies.remove("remember");
        }
        event.preventDefault();
    });
};