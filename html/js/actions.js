// Global action manager
(function(global) {
    // Interface:
    //   - register(id, manager)
    //   - applyEvent(event)
    var ActionManager = function() {
        this.submanagers = {};
    };

    ActionManager.URL = '/events/record'
    ActionManager.prototype.register = function(id, manager) {
        this.submanagers[id] = manager;
    };

    ActionManager.prototype.unregister = function(id) {
        delete this.submanagers[id];
    };

    ActionManager.prototype.applyEvent = function(event) {
        var id = event.namespace;
        if (!id) {
            throw Error('event is missing "namespace" value:', event);
        }

        // record the event on the server
        $.ajax({
            type: 'post',
            url: ActionManager.URL,
            data: JSON.stringify(event),
            contentType: 'application/json'
        });

        this.submanagers[id].applyEvent(event);
    };

    global.C2StemActions = new ActionManager();

})(this);
