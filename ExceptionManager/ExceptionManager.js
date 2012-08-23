define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/request/script',
    'Sds/ExceptionManager/Exception/BaseException',
    'Sds/ExceptionManager/Exception/InvalidTypeException',
    'Sds/ExceptionManager/Exception/ServerLogFailedException',
    'Sds/ExceptionManager/ExceptionManagerInterface'
],
function(
    declare,
    lang,
    script,
    BaseException,
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

            // exceptionInputAgent: Sds.InputAgent.BaseInputAgent
            //     Responsible for displaying the error
            exceptionInputAgent: undefined,

            serverUrl: undefined,

            jsonpTimeout: 10000,

            handle: function(exception){

                if ( ! exception instanceof BaseException){
                    // Supplied exception needs to be wrapped
                    this.handle(new InvalidTypeException(exception));
                }

                if (exception.display) {
                    this.exceptionInputAgent.activate(exception);
                }

                if (exception.log) {
                    script.get(this.serverUrl, {
                        query: exception,
                        jsonp: 'callback',
                        timeout: this.jsonpTimeout
                    }).then(null, lang.hitch(this, function(error){
                        this.handle(new ServerLogFailedException(error));
                    }));
                }
            }
        }
    );
});