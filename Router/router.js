define([
    'dojo/_base/lang',
    'dojo/on',
    'dojo/when',
    'dojo/string',
    'dojo/i18n!../nls/routerMessages',
    'dojo/query',
    './Exception/RouteNotFound'
],
function (
    lang,
    on,
    when,
    string,
    routerMessages,
    query,
    RouteNotFound
){
    return {

        // if the base url is undefined, it will be set to the
        // url when the router is started
        //baseUrl: undefined,

        // routes: array
        //
        routes: [],

        // controllerManager: Sds/ModuleManager/ModuleManager
        //    This must be an instance of the ModuleManager. This is where
        //    the configured controller instances will be pulled from.
        //controllerManager: undefined,

        //the currently active route
        //active: undefined,

        startup: function(){

            if ( ! this.baseUrl){
                var base = window.location.href.split('/');
                base.pop();
                this.baseUrl = base.join('/');
            }

            on(window, 'popstate', lang.hitch(this, function(e){
                if (e.state){
                    this.go(e.state.route, true);
                } else {
                    this.go(window.location.href);
                }
            }));

            // Catch click events on anchor tags
            query('a').on('click', lang.hitch(this, function(e){
                var route = e.target.attributes['href'].nodeValue;
                if (route){
                    e.preventDefault();
                    this.go(route);
                }
            }));

            // Go to inital route
            this.go(window.location.href);
        },

        resolve: function(route){

            // strip off the base url first
            if (route.indexOf(this.baseUrl) == 0){
                route = route.substring(this.baseUrl.length + 1);
            }

            // check for absolute url - these are not routed
            if (route.indexOf('http://') == 0){
                return ({ignore: true});
            }

            var pieces = route.split('/'),
                config,
                method,
                args = [],
                i;

            //Check routes in reverse order - first registerd means last checked
            for (i = this.routes.length - 1; i >= 0; i--){
                if (this.routes[i].regex.test(pieces[0])){
                    config = this.routes[i];
                    break;
                }
            }
            if (!config){
                throw new RouteNotFound(string.substitute(
                    routerMessages.noConfig,
                    {controller: pieces[0]}
                ));
            }
            if (config.ignore){
                return ({ignore: true});
            }

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
                return {route: method};
            }

            for (i = 2; i < pieces.length; i++){
                args.push(pieces[i]);
            }

            return lang.mixin({route: route, controller: config.controller, args: args}, method);
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

            var routeMatch = this.resolve(route);

            if (routeMatch.ignore){
                window.location.href = route;
                return;
            }
            if (typeof(routeMatch.route) != 'string'){
                history.go(routeMatch.route);
                return;
            }

            //load the correct controller
            when(this.controllerManager.get(routeMatch.controller), lang.hitch(this, function(controller){

                if (! controller[routeMatch.enter]){
                    throw new RouteNotFound(string.substitute(
                        routerMessages.noMethod,
                        {method: routeMatch.enter, controller: routeMatch.controller}
                    ));
                }
                if (routeMatch.exit && ! controller[routeMatch.exit]){
                    throw new RouteNotFound(string.substitute(
                        routerMessages.noMethod,
                        {method: routeMatch.exit, controller: routeMatch.controller}
                    ));
                }

                //Route resolved correctly - pushState and call the controller
                if ( ! surpressPushState){
                    history.pushState({route: routeMatch.route}, '', this.baseUrl + '/' + routeMatch.route);
                }

                if (this.active && this.active.exit){
                    this.active.controller[this.active.exit]();
                }

                routeMatch.controller = controller;
                this.active = routeMatch;
                controller[routeMatch.enter].apply(routeMatch.controller, routeMatch.args);
            }));
        }
    }
});