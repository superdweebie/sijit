define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    './severity',
    './Application',
    'dojo/Stateful'
],
function(
    declare,
    lang,
    severity,
    Application,
    Stateful
){
    return declare(
        [Stateful],
        {

            // summary:
            //     Module providing exception display and logging

            notifyUserLevel: -1,

            consoleLogLevel: -1,

            serverLogLevel: -1,

            //consoleLogRenderer: undefined,

            //notifyUserRenderer: undefined,

            //serverLogRenderer: undefined,

            //started: false,

            _exceptionSetter: function(value){
                this.handle(value);
            },

            startup: function(){
                if ( ! this.started){
                    window.onerror = lang.hitch(this, function(exception){
                        if (exception.indexOf('isBase!') == -1){
                            var applicationException = new Application(exception);
                            if ( !applicationException.consoleLog && !applicationException.serverLog && !applicationException.notifyUser){
                                return false;
                            }
                        }
                        return true;
                    });
                    this.started = true;
                }
            },

            handle: function(exception){

                var handled = false,
                    stack = exception.stack.split(/\r\n|\r|\n/g),
                    cleanStack = [],
                    stackItem;

                for(var i = 0; i < stack.length; i++){
                    if (stack[i].indexOf('ErrorCtor') != 0 && stack[i].length != 0){
                        stackItem = stack[i].split('@')[1].split(':');
                        cleanStack.push({
                            file: stackItem[0] + stackItem[1],
                            line: stackItem[2]
                        });
                    }
                }

                exception = {
                    name: exception.name,
                    message: exception.message.substring(7),
                    stack: cleanStack,
                    severity: severity.codeToString(exception.severity),
                    notifyUser: exception.notifyUser,
                    consoleLog: exception.consoleLog,
                    serverLog: exception.serverLog
                }

                if ((exception.consoleLog && this.consoleLogLevel == -1) ||
                    this.consoleLogLevel >= exception.severity
                ) {
                    this.consoleLogRenderer.render(exception);
                    handled = true;
                }

                if ((exception.notifyUser && this.notifyUserLevel == -1) ||
                    this.notifyUserLevel >= exception.severity
                ) {
                    this.userNotifyRenderer.render(exception);
                    handled = true;
                }

                if ((exception.serverLog && this.serverLogLevel == -1) ||
                    this.serverLogLevel >= exception.severity
                ) {
                    this.serverLogRenderer.render(exception);
                    handled = true;
                }

                delete(this.exception);
                return handled;
            }
        }
    )
});