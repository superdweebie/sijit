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
        //             'authentication': {
        //                 name: 'Sds/AuthenticationModule/AuthenticationController',
        //                 methods: {
        //                     name: 'login'
        //                 }
        //             }
        //       }
        //    Going to the followning hash: '/authenticaiton/login' will then
        //    get the instance of 'Sds/AuthenticationModule/AuthenticationController'
        //    from the controllerManager, and call the login
        //    function.
        //
        controllers: {},

        // controllerManager: Sds/ServiceManager/ServiceManager
        //    This must be an instance of the serviceManager. This is where
        //    the configured controller instances will be pulled from.
        controllerManager: undefined,

        resolve: function(event){
            var pieces = event.params.route.split('/');
            var config = this.controllers[pieces[0]];
            if (config){
                var method;
                if (pieces[1]){
                    if (config.methods[pieces[1]]){
                        method = config.methods[pieces[1]];
                    } else {
                        throwEx(new RouteNotFoundException('Function ' + pieces[1] + ' could not configured for controller ' + config.name + '.'));
                        return
                    }
                } else if (config.defaultMethod) {
                    method = config.defaultMethod;
                } else {
                    throwEx(new RouteNotFoundException('Controller ' + config.name + ' has no default method defined'));
                    return
                }

                var args = [];
                for (var i = 2; i < pieces.length; i++){
                    args.push(pieces[i]);
                }
                when(this.controllerManager.getObject(config.name), function(controller){
                    if (controller[method]){
                        controller[method].apply(controller, args);
                    } else {
                        throwEx(new RouteNotFoundException('Function ' + method + ' could not be in the controller instance created from the ' + config.name + ' controller.'));
                        return;
                    }
                });
            } else {
                throwEx(new RouteNotFoundException('Controller name ' + pieces[0] + ' could not be found in the controllerManager\n\ config.'));
                return;
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