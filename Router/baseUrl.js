define([
    'get!./startedRouter!'
],
function(
    router
){
    // module:
    //		Sds/Router/baseUrl

    return {
        load: function(id, require, callback){
            callback(router.baseUrl);
        }
    };
});


