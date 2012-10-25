define([
    'dojo/_base/lang',
    'dojo/errors/create',
    'Sds/ExceptionModule/Exception/BaseException'
],
function(
    lang,
    create,
    BaseException
){
	return create(
        "InvalidArgumentException",
        function(message, options){

            this.display = true;

            this.log = false;

            lang.mixin(this, options);
        },
        BaseException
    )
});
