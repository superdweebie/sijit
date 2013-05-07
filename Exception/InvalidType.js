define([
    'dojo/_base/lang',
    'dojo/errors/create',
    './Base',
    './severity'
],
function(
    lang,
    create,
    BaseException,
    severity
){
	return create(
        "InvalidTypeException",
        function(message, options){

            this.severity = severity.WARNING;

            this.display = false;

            this.log = true;

            lang.mixin(this, options);
        },
        BaseException
    )
});
