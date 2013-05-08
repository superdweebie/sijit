define([
    'require',
    'dojo/_base/lang',
    'dojo/errors/create',
    './severity'
],
function(
    require,
    lang,
    create,
    severity
){

	// module:
	//		Sds/Exception/Base

	return create(
        "Base",
        function(message, options){

            this.message = 'isBase!' + message;

            lang.mixin(this, options);
            
            require(['proxy!./Handler'], lang.hitch(this, function(handlerProxy){
                handlerProxy.set('exception', this);
            }))
        },
        null,
        {
            //
            //severity: string
            //    One of the Exception.severities. Indicates how serious the exception is
            severity: severity.ERROR,

            //notifyUser: boolean
            //    Should this exception be displayed to the user?
            //notifyUser: false

            //serverLog: boolean
            //    Should this exception be logged to a server?
            //serverLog: false;

            //consoleLog: boolean
            //    Should this exception be logged to the console?
            consoleLog: true
        }
    )
});
