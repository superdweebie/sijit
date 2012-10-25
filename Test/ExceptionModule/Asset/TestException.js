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
        "TestException",
        function(message, options){

            this.display = false;

            this.log = false;

            lang.mixin(this, options);
        },
        BaseException
    )
});
