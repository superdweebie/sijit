define([
    'dojo/_base/lang',
    'dojo/errors/create',
    './severity'
],
function(
    lang,
    create,
    severity
){
    // the base exception that all Sds exceptions inherit from

	return create(
        "BaseException",
        function(message, options){
            //
            //severity: string
            //    One of the Exception.severities. Indicates how serious the exception is
            this.severity = severity.ERROR;

            //notifyUser: boolean
            //    Should this exception be displayed to the user?
            //this.notifyUser = false;

            //serverLog: boolean
            //    Should this exception be logged to a server?
            //this.serverLog = false;

            //consoleLog: boolean
            //    Should this exception be logged to the console?
            this.consoleLog = true;

            lang.mixin(this, options);
        }
    );
});
