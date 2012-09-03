define([
    'dojo/_base/lang',
    'dojo/errors/create',
    'Sds/ExceptionModule/Severity'
],
function(
    lang,
    create,
    Severity
){
	return create(
        "BaseException",
        function(message, options){

            //severity: string
            //    One of the Exception.severities. Indicates how serious the exception is
            this.severity = Severity.ERROR;

            //display: boolean
            //    Should this exception be displayed to the user?
            this.display = false;

            //log: boolean
            //    Should this exception be logged?
            this.log = true;

            //code: string
            //    The exception code
            this.code = undefined;

            lang.mixin(this, options);
        }
    )
});
