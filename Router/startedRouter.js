define([
    'get!Sds/Router/router'
],
function(
    router
){
    // module:
    //		Sds/Router/startedRouter
    //
    // An AMD plugin that return an instance of Sds/Router/router that has been
    // configured by the shared service manager, and has had startup() called

    var startedRouter = undefined;
    return {
        load: function(id, require, callback){
            if ( ! startedRouter){
                startedRouter = router;
                startedRouter.startup();
            }
            callback(startedRouter);
        }
    };
});
