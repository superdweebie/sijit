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
        "TestException",
        function(message, options){

            this.severity = Severity.ERROR;

            this.display = false;

            this.log = false;

            lang.mixin(this, options);
        },
        BaseException
    )
});
