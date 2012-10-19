define([
    'dojo/_base/declare',
    'Sds/ExceptionModule/BaseExceptionController'
],
function(
    declare,
    BaseExceptionController
){
    return declare(
        'Sds/Test/AuthenticationModule/Asset/MockExceptionController',
        [BaseExceptionController],
        {
            lastException: undefined,

            handle: function(exception){
                this.lastException = exception;
            }
        }
    );
});
