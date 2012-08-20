define([
    'dojo/_base/declare',
    'dojo/request/script',
    'Sds/ExceptionManager/Exception/BaseException',
    'Sds/ExceptionManager/Exception/InvaidTypeException',
    'Sds/ExceptionManager/Exception/ServerLogFailedException',
    'Sds/ExceptionManager/ExceptionManagerInterface'
],
function(
    declare,
    script,
    InvalidTypeException,
    ServerLogFailedException,
    ExceptionManagerInterface
){
    return declare (
        'Sds.ExceptionManager.ExceptionManager',
        [ExceptionManagerInterface],
        {
            // summary:
            //     Module providing exception display and logging

            // errorInputAgent: Sds.InputAgent.BaseInputAgent
            //     Responsible for displaying the error
            exceptionInputAgent: undefined,

            serverUrl: undefined,

            jsonpTimeout: 10000,

            handle: function(exception){

                if ( ! exception.isInstanceOf || ! exception.isInstanceOf(BaseException)){
                    // Supplied exception needs to be wrapped
                    this.handle(new InvalidTypeException(exception));
                }

                if (exception.display) {
                    this.exceptionInputAgent.activate();
                }

                if (exception.log) {
                    script.get(this.serverUrl, {
                        query: exception,
                        jsonp: 'callback',
                        timeout: this.jsonpTimeout
                    }).then(null, function(error){
                        this.handle(new ServerLogFailedException(error));
                    });
                }
            }
        }
    );
});