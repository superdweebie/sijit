define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'dojo/_base/lang',
    'dojo/json',
    'dojo/request/script',
    './Base',
    './InvalidType',
    './ServerLogFailed'
],
function(
    declare,
    Deferred,
    lang,
    json,
    script,
    BaseException,
    InvalidTypeException,
    ServerLogFailedException
){
    return declare (
        [],
        {
            // summary:
            //     Module providing exception display and logging

            // exceptionView: Sds/Mvc/BaseView
            //     Responsible for displaying the exception
            exceptionView: undefined,

            serverUrl: undefined,

            jsonpTimeout: 10000,

            displayLevel: -1,

            logLevel: -1,

            registeredExceptions: [],

            handle: function(exception){

                if ( ! exception instanceof BaseException){
                    this.standardize(exception).then(lang.hitch(this, function(standardizedException){
                        this.handle(standardizedException);
                    }));
                    return;
                }

                if ((exception.display && this.displayLevel == -1) ||
                    this.displayLevel >= exception.severity
                ) {
                    this.exceptionView.activate(exception).then(function(){
                        exception.handle.resolve();
                    })
                } else {
                    exception.handle.resolve();
                }

                if ((exception.log && this.logLevel == -1) ||
                    this.logLevel >= exception.severity
                ) {
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

            standardize: function(exception){

                if (exception instanceof BaseException){
                    return exception;
                }

                var returnDeferred = new Deferred;

                if (exception.response){
                    exception = json.parse(exception.response.text);
                }

                var isRegistered = false;
                for (var exceptionMid in this.registeredExceptions){
                    var exceptionType = this.registeredExceptions[exceptionMid];
                    if (exceptionType == exception.type){
                        require([exceptionMid], function(StandardizedException){
                            returnDeferred.resolve(new StandardizedException(exception.message));
                        });
                        isRegistered = true;
                        break;
                    }
                }

                if ( ! isRegistered){
                    returnDeferred.resolve(new InvalidTypeException(exception.message));
                }
                return returnDeferred;
            },

            onLogged: function(exception, result){
                console.debug(result);
                console.debug(exception);
            }
        }
    );
});