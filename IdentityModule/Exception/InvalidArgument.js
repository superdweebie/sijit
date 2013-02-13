define([
    'dojo/_base/lang',
    'dojo/errors/create',
    '../../ExceptionModule/Base'
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
