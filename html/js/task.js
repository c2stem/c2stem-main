var c2stem = new C2Stem();
c2stem.fixupLogoutLink();

c2stem.loadTaskData(c2stem.query.id, function (err, res) {
    if (err === "ERROR: Not logged in") {
        window.location.href = "login.html";
    } else if (err) {
        Materialize.toast(err || 'Could not load tasks');
    } else {
        c2stem.fixupModuleLink(res.parent.id, res.parent.name);
        c2stem.fixupTaskLink(res.id, res.name);

        $('#tabs-div').append('<ul class="tabs tabs-transparent"></ul>');

        for (var i = 0; i < res.tabs.length; i++) {
            var tab = res.tabs[i];
            if (tab.type === 'desc') {
                c2stem.addDescriptionTab(tab.id, tab.name, tab.markup);
            } else if (tab.type === 'snap1') {
                c2stem.addSnap1Tab(tab.id, tab.name);
            } else if (tab.type === 'snap2') {
                c2stem.addSnap2Tab(tab.id, tab.name);
            } else if (tab.type === 'cm') {
                c2stem.addConcpetualModelingTab(tab.id, tab.name);
            }
        }

        $('ul.tabs').tabs(); // visualize the tabs
    }
});