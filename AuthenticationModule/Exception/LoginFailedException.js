define([
    'dojo/_base/lang',
    'dojo/errors/create',
    '../../ExceptionModule/Base',
    '../../ExceptionModule/severity'
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

            this.severity = severity.NOTICE;

            this.display = true;

            this.log = false;

            lang.mixin(this, options);
        },
        BaseException
    )
});
