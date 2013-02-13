define([
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/errors/create',
    './severity'
],
function(
    lang,
    Deferred,
    create,
    severity
){
	return create(
        "BaseException",
        function(message, options){
            //
            //severity: string
            //    One of the Exception.severities. Indicates how serious the exception is
            this.severity = severity.ERROR;

            //display: boolean
            //    Should this exception be displayed to the user?
            this.display = false;

            //log: boolean
            //    Should this exception be logged?
            this.log = true;

            //code: string
            //    The exception code
            this.code = undefined;

            this.handle = new Deferred;

            lang.mixin(this, options);
        }
    );
});
