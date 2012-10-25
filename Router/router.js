define([
    'dojo/_base/lang',
    'dojo/when',
    'dojo/router',
    'Sds/ExceptionModule/throwEx',
    'Sds/Router/Exception/RouteNotFoundException'
],
function (
    lang,
    when,
    router,
    throwEx,
    RouteNotFoundException
){
    return {

        // controllers: object
        //    This should be an object defineing the routes to controllers. eg:
        //       {
        //             'authentication': 'Sds/AuthenticationModule/AuthenticationController'
        //       }
        //    Going to the followning hash: '/authenticaiton/login' will then
        //    get the instance of 'Sds/AuthenticationModule/AuthenticationController'
        //    from the controllerManager, and call the loginAction
        //    function.
        //
        controllers: {},

        // controllerManager: Sds/ServiceManager/ServiceManager
        //    This must be an instance of the serviceManager. This is where
        //    the configured controller instances will be pulled from.
        controllerManager: undefined,

        resolve: function(event){
            var pieces = event.params.route.split('/');
            var controllerAlias = this.controllers[pieces[0]];
            if (controllerAlias){
                var method;
                if (pieces[1]){
                    method = pieces[1] + 'Action';
                } else {
                    method = 'indexAction';
                }

                var args = [];
                for (var i = 2; i < pieces.length; i++){
                    args.push(pieces[i]);
                }
                when(this.controllerManager.getObject(controllerAlias), function(controller){
                    if (controller[method]){
                        controller[method].apply(controller, args);
                    } else {
                        throwEx(new RouteNotFoundException('Function ' + method + ' could not be in the controller instance created from the ' + controllerAlias + ' controller alias.'));
                    }
                });
            } else {
                throwEx(new RouteNotFoundException('Controller alias ' + controllerAlias + ' could not be found in the controllerManager config.'));
            }
        },

        startup: function(){
            router.register('/*route', lang.hitch(this, 'resolve'));
            router.startup();
        },

        go: function(route){
            router.go(route);
        }
    }
});