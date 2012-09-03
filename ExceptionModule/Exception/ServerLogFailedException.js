define([
    'dojo/_base/lang',
    'dojo/errors/create',
    'Sds/ExceptionModule/Severity',
    'Sds/ExceptionModule/Exception/BaseException'
],
function(
    lang,
    create,
    Severity,
    BaseException
){
	return create(
        "ServerLogFailedException",
        function(message, options){

            this.severity = Severity.ERROR;

            this.display = true;

            this.log = false; //Make sure this stays false, or you'll start an endless loop

            lang.mixin(this, options);
        },
        BaseException
    )
});
