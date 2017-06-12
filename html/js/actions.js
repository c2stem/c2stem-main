// Global action manager
//
// Interface:
//   - register(id, manager)
//   - unregister(id)
//   - applyEvent(event)

(function(global) {
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

        event.time = event.time || Date.now();

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

    // Base Class for Action Managers
    function ActionManager() {
        this.id = null;
    }

    ActionManager.prototype.addActions = function() {
        var actions = Array.prototype.slice.call(arguments),
            myself = this;

        // Every event/action supported by the action manager has the same life-cycle:
        //  - eventName
        //    - public API
        //  - _eventName
        //    - Convert public API args to serializable, easy format
        //  - onEventName
        //    - apply the given action in the environment
        actions.forEach(function(method) {
            myself[method] = function() {
                var args = Array.prototype.slice.apply(arguments),
                    fn = '_' + method,
                    event;

                if (this[fn]) {
                    args = this[fn].apply(this, args) || args;
                }

                event = {
                    type: method,
                    args: args
                };

                return this.applyEvent(event);
            };
        });
    };

    var capitalize = function(word) {
        return word.substring(0,1).toUpperCase() + word.substring(1)
    };

    ActionManager.prototype.applyEvent = function(event) {
        var method = 'on' + capitalize(event.type);

        if (!event.namespace) { // route all internal events through C2StemActions
            event.namespace = this.id;
            return C2StemActions.applyEvent(event);
        } else {
            return this[method].apply(this, event.args);
        }
    };

    ActionManager.prototype.assignId = function(id) {
        this.id = id;
        return C2StemActions.register(id, this);
    };

    global.ActionManager = ActionManager;

})(this);
