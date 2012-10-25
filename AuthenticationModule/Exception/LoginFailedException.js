define([
    'dojo/_base/lang',
    'dojo/errors/create',
    'Sds/ExceptionModule/Exception/BaseException',
    'Sds/ExceptionModule/severity'
],
function(
    lang,
    create,
    BaseException,
    severity
){
	return create(
        "LoginFailedException",
        function(message, options){

            this.severity = severity.INFO;

            this.display = true;

            this.log = false;

            lang.mixin(this, options);
        },
        BaseException
    )
});
