define([
    'dojo/_base/declare',
    'Sds/ExceptionManager/ExceptionManagerInterface'
],
function(
    declare,
    ExceptionManagerInterface
){
    return declare(
        'Sds.Test.AuthModule.Asset.MockExceptionManager',
        [ExceptionManagerInterface],
        {
            lastException: undefined,

            handle: function(exception){
console.dir(exception);
                this.lastException = exception;
            }
        }
    );
});
