define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/request/script',
    'Sds/ExceptionModule/Exception/BaseException',
    'Sds/ExceptionModule/Exception/InvalidTypeException',
    'Sds/ExceptionModule/Exception/ServerLogFailedException',
    'Sds/ExceptionModule/BaseExceptionController'
],
function(
    declare,
    lang,
    script,
    BaseException,
    InvalidTypeException,
    ServerLogFailedException,
    BaseExceptionController
){
    return declare (
        'Sds/ExceptionModule/ExceptionController',
        [BaseExceptionController],
        {
            // summary:
            //     Module providing exception display and logging

            // exceptionView: Sds.View.BaseView
            //     Responsible for displaying the error
            exceptionView: undefined,

            serverUrl: undefined,

            jsonpTimeout: 10000,

            handle: function(exception){

                if ( ! exception instanceof BaseException){
                    // Supplied exception needs to be wrapped
                    this.handle(new InvalidTypeException(exception));
                }

                if (exception.display) {
                    this.exceptionView.activate(exception);
                }

                if (exception.log) {
                    script.get(this.serverUrl, {
                        query: {query: '{"name": "test"}'},
                        jsonp: 'callback',
                        preventCache: true,
                        timeout: this.jsonpTimeout
                    }).then(lang.hitch(this, function(result){this.onLogged(exception, result)}), lang.hitch(this, function(error){
                        this.handle(new ServerLogFailedException(error));
                    }));
                }
            },

            onLogged: function(exception, result){
                console.debug(result);
                console.debug(exception);
            }
        }
    );
});