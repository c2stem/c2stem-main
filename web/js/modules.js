function addModule(title, img) {
    var modules = $("#modules"),
        id = modules.children().length;

    modules.append(`
        <div class="col m3">
            <a href="tasks.html">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator module-img" src="img/${img}" title="">
                    </div>
                    <div class="card-content">
                        <span class="card-title">${title}</span>
                        <input type="checkbox" id="${id}">
                        <label for="${id}">Submit solution</label>
                    </div>
                </div>
            </a>
        </div>
    `);
};

window.onload = function () {
    addModule("1D motion", "school-bus.png");
    addModule("Relative motion", "boat.png");
    addModule("Gravity", "plane.png");
    addModule("Rocket landing", "falcon9.png");
};