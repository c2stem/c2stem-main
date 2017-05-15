window.onload = function () {
    var snap = $("#computation > iframe").get(0);
    snap = snap.contentWindow || snap.contentDocument.defaultView;
    snap.SnapCloud.url = location.origin + "/SnapCloud/";
}
