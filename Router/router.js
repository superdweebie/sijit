define([
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/on',
    'dojo/when',
    'dojo/string',
    'dojo/i18n!Sds/nls/routerMessages',
    'dojo/query',
    'Sds/ExceptionModule/throwEx',
    'Sds/Router/Exception/RouteNotFoundException'
],
function (
    lang,
    Deferred,
    on,
    when,
    string,
    routerMessages,
    query,
    throwEx,
    RouteNotFoundException
){
    return {

        // if the base url is undefined, it will be set to the
        // url when the router is started
        baseUrl: undefined,

        // routes: object
        //    This should be an object defineing the routes to controllers. eg:
        //       {
        //             'authentication': {
        //                 controller: 'Sds/AuthenticationModule/AuthenticationController',
        //                 methods: {
        //                     name: 'login'
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
        controllerManager: undefined,

        currentRoute: undefined,

        resolve: function(route){

            var resultDeferred = new Deferred;

            var pieces = route.split('/');
            var config = this.routes[pieces[0]];
            if (config){
                var method;
                if (pieces[1]){
                    if (config.methods[pieces[1]]){
                        method = config.methods[pieces[1]];
                    } else {
                        resultDeferred.reject(throwEx(new RouteNotFoundException(string.substitute(
                            routerMessages.methodNotConfigured,
                            {method: pieces[1], controller: config.controller}
                        ))));
                        return resultDeferred;
                    }
                } else if (config.defaultMethod) {
                    method = config.defaultMethod;
                } else {
                    resultDeferred.reject(throwEx(new RouteNotFoundException(string.substitute(
                        routerMessages.noDefaultMethod,
                        {controller: config.controller}
                    ))));
                    return resultDeferred;
                }

                var args = [];
                for (var i = 2; i < pieces.length; i++){
                    args.push(pieces[i]);
                }
                when(this.controllerManager.get(config.controller), function(controller){
                    if (controller[method]){
                        resultDeferred.resolve({controller: controller, method: method, args: args});
                    } else {
                        resultDeferred.reject(throwEx(new RouteNotFoundException(string.substitute(
                            routerMessages.noMethod,
                            {method: method, controller: config.controller}
                        ))));
                    }
                });
                return resultDeferred;
            }

            resultDeferred.reject(throwEx(new RouteNotFoundException(string.substitute(
                routerMessages.noConfig,
                {controller: pieces[0]}
            ))));
            return resultDeferred;
        },

        startup: function(){
            if ( ! this.baseUrl){
                var base = window.location.href.split('/');
                base.pop();
                this.baseUrl = base.join('/');
            }

            on(window, 'popstate', lang.hitch(this, function(e){
                if (e.state){
                    this.go(e.state.route, true);
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
            this.go(this.extractRoute(window.location.href));
        },

        extractRoute: function(url){
            var position = url.search(this.baseUrl);
            if (position == 0){
                return url.substring(this.baseUrl.length + 1);
            }
            return false;
        },

        go: function(route, skipPushState){

            if (route == this.currentRoute){
                //Don't do anything if the route hasn't changed
                return;
            }

            this.resolve(route).then(
                lang.hitch(this, function(result){
                    //Route resolved correctly - pushState and call the controller
                    this.currentRoute = route;
                    if ( ! skipPushState){
                        history.pushState({route: route}, '', this.baseUrl + '/' + route);
                    }
                    result.controller[result.method].apply(result.controller, result.args);
                }),
                function(err){
                    //Route didn't resolve, just go to the url
                    window.location.href = route;
                }
            );
        }
    }
});