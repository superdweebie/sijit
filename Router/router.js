define([
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/on',
    'dojo/when',
    'dojo/string',
    'dojo/i18n!../nls/routerMessages',
    'dojo/query',
    '../is',
    './Exception/RouteNotFound',
    'dojox/NodeList/delegate'
],
function (
    lang,
    Deferred,
    on,
    when,
    string,
    routerMessages,
    query,
    is,
    RouteNotFound
){
    return {

        // if the base url is undefined, it will be set to the
        // url when the router is started
        //baseUrl: undefined,

        // dojo's base url must be modified sometimes so that AMD modules can still
        // be found and loaded
        //dojoBaseUrl: undefined,

        //dojoRelativeBaseUrl: false,

        // routes: object
        //    This should be an object defineing the routes to controllers. eg:
        //       {
        //             'authentication': {
        //                 controller: 'Sds/AuthenticationModule/AuthenticationController',
        //                 methods: {
        //                     login: 'login'
        //                 }
        //             }
        //       }
        //    Pushing the followning state: baseUrl + '/authenticaiton/login' will then
        //    get the instance of 'Sds/AuthenticationModule/AuthenticationController'
        //    from the controllerManager, and call the login
        //    function.
        //
        routes: {},

        // controllerManager: Sds/ModuleManager/ModuleManager
        //    This must be an instance of the ModuleManager. This is where
        //    the configured controller instances will be pulled from.
        //controllerManager: undefined,

        //the currently active route
        //active: undefined,

        resolve: function(route){

            // strip off the base url first
            if (route.indexOf(this.baseUrl) == 0){
                route = route.substring(this.baseUrl.length + 1);
            }

            var resultDeferred = new Deferred,
                pieces = route.split('/'),
                config = this.routes[pieces[0]],
                method,
                args = [],
                i;

            if (config){
                //identify the correct method
                if (pieces[1]){
                    if (config.methods[pieces[1]]){
                        method = config.methods[pieces[1]];
                    } else {
                        throw new RouteNotFound(string.substitute(
                            routerMessages.methodNotConfigured,
                            {method: pieces[1], controller: config.controller}
                        ));
                    }
                } else if (config.defaultMethod) {
                    method = config.defaultMethod;
                } else {
                    throw new RouteNotFound(string.substitute(
                        routerMessages.noDefaultMethod,
                        {controller: config.controller}
                    ));
                }
                if (typeof(method) == 'string'){
                    method = {enter: method};
                    if (config.defaultMethod.hasOwnProperty('exit')){
                        method.exit = config.defaultMethod.exit;
                    }
                } else if (typeof(method) != 'object') {
                    // method is an integer. history.go should be used, rather than calling a controller.
                    resultDeferred.resolve({
                        route: method
                    });
                    return resultDeferred;
                }

                for (i = 2; i < pieces.length; i++){
                    args.push(pieces[i]);
                }

                //load the correct controller
                when(this.controllerManager.get(config.controller), function(controller){

                    if (controller[method.enter]){
                        resultDeferred.resolve(lang.mixin({route: route, controller: controller, args: args}, method));
                    } else {
                        throw new RouteNotFound(string.substitute(
                            routerMessages.noMethod,
                            {method: method, controller: config.controller}
                        ));
                    }
                });
                return resultDeferred;
            }

            throw new RouteNotFound(string.substitute(
                routerMessages.noConfig,
                {controller: pieces[0]}
            ));
        },

        startup: function(){
            if ( ! this.baseUrl){
                var base = window.location.href.split('/');
                base.pop();
                this.baseUrl = base.join('/');
            }

            this.dojoBaseUrl = require.baseUrl;
            if (this.dojoBaseUrl.indexOf('http://') != 0){
                this.dojoRelativeBaseUrl = true;
            }

            on(window, 'popstate', lang.hitch(this, function(e){
                if (e.state){
                    this.go(e.state.route, true);
                } else {
                    this.go(window.location.href);
                }
            }));

            // Catch click events on anchor tags
            query('body').delegate('a', 'onclick', lang.hitch(this, function(e){
                var route = e.target.attributes['href'].nodeValue;
                if (route){
                    e.preventDefault();
                    this.go(route);
                }
            }));

            // Go to inital route
            this.go(window.location.href);
        },

        go: function(route, surpressPushState){
            // route may be a string, which will be routed, or a number which move to a relative point in history

            if (typeof(route) != 'string'){
                history.go(route);
                return;
            }

            if (this.active && route == this.active.route){
                //Don't do anything if the route hasn't changed
                return;
            }

            this.resolve(route).then(
                lang.hitch(this, function(result){

                    if (typeof(result.route) != 'string'){
                        history.go(result.route);
                        return;
                    }

                    //Route resolved correctly - pushState and call the controller
                    if ( ! surpressPushState){
                        history.pushState({route: result.route}, '', this.baseUrl + '/' + result.route);
                    }

                    //If dojo base is a relative path, it may need to be modified
                    if (this.dojoRelativeBaseUrl){
                        var num = result.route.split('/').length - 1,
                            prepend = '',
                            i;

                        for (i = 0; i < num; i++){
                            prepend += '../';
                        }
                        require.baseUrl = prepend + this.dojoBaseUrl;
                    }

                    if (this.active && this.active.exit){
                        this.active.controller[this.active.exit]();
                    }

                    this.active = result;
                    result.controller[result.enter].apply(result.controller, result.args);
                }),
                function(err){
                    //Route didn't resolve, just go to the url
                    window.location.href = route;
                }
            );
        }
    }
});