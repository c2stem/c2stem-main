// Global action manager
//
// Interface:
//   - register(id, manager)
//   - unregister(id)
//   - applyEvent(event)

(function(global) {
    var GlobalActionManager = function() {
        this.submanagers = {};
        this.eventListeners = [];
    };

    GlobalActionManager.URL = '/events/record'
    GlobalActionManager.prototype.register = function(id, manager) {
        this.submanagers[id] = manager;
    };

    GlobalActionManager.prototype.unregister = function(id) {
        delete this.submanagers[id];
    };


    GlobalActionManager.prototype.addEventListener = function(listener){
        if(this.eventListeners.indexOf(listener) == -1)
            this.eventListeners.push(listener);
    };

    GlobalActionManager.prototype.removeEventListener = function(listener){
        var edx = this.eventListeners.indexOf(listener);
        if( edx != -1)
            this.eventListeners.splice(edx, 1);
    };

    GlobalActionManager.prototype.applyEvent = function(event) {
        var id = event.namespace;
        if (!id) {
            throw Error('event is missing "namespace" value:', event);
        }

        event.time = event.time || Date.now();

        if(this.eventListeners.length !== 0){
            var i = 0;
            for(; i < this.eventListeners.length; i++){
                var listener = this.eventListeners[i];
                if(listener)
                    listener(event);
            }
        }
         console.log("Recording event to server, event:", event);
        // record the event on the server
        $.ajax({
            type: 'post',
            url: GlobalActionManager.URL,
            data: JSON.stringify(event),
            contentType: 'application/json'
        });

        // console.log("this:",this);
        this.submanagers[id].applyEvent(event);
    };

    global.C2StemActions = new GlobalActionManager();

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
        // console.log("Calling apply event", event, "of this:", this, " method:", method);
        if (!event.namespace) { // route all internal events through C2StemActions
            event.namespace = this.id;
            return C2StemActions.applyEvent(event);
        } else {
            // console.log("calling method", method, "of this:", this, " with arguments:", event.args);
            return this[method].apply(this, event.args);
        }
    };

    ActionManager.prototype.assignId = function(id) {
        this.id = id;
        return C2StemActions.register(id, this);
    };

    global.ActionManager = ActionManager;

})(this);
