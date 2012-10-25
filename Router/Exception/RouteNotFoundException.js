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
        "RouteNotFoundException",
        function(message, options){

            this.display = false;

            this.log = true;

            lang.mixin(this, options);
        },
        BaseException
    )
});
