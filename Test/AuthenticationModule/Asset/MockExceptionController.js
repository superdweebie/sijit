define([
    'dojo/_base/declare'
],
function(
    declare
){
    return declare(
        'Sds/Test/AuthenticationModule/Asset/MockExceptionController',
        [],
        {
            lastException: undefined,

            handle: function(exception){
                this.lastException = exception;
            }
        }
    );
});
