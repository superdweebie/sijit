define([
    'get!./Handler'
],
function(
    handler
){
    // module:
    //		Sds/Exception/startedHandler
    //
    // An AMD plugin that return an instance of Sds/Exception/Handler that has been
    // configured by the shared service manager, and has had startup() called

    var startedHandler = undefined;
    return {
        load: function(id, require, callback){
            if ( ! startedHandler){
                startedHandler = handler;
                startedHandler.startup();
            }
            callback(startedHandler);
        }
    };
});
