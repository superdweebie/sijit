define([
    'dojo/_base/lang',
    'dojo/errors/create',
    'Sds/ExceptionManager/Severity',
    'Sds/ExceptionManager/Exception/BaseException'
],
function(
    lang,
    create,
    Severity,
    BaseException
){
	return create(
        "LoginFailedException",
        function(message, options){

            this.severity = Severity.INFO;

            this.display = true;

            this.log = false;

            lang.mixin(this, options);
        },
        BaseException
    )
});
