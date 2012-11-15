define([
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/on',
    'dojo/when',
    'dojo/string',
    'dojo/i18n!Sds/nls/routerMessages',
    'dojo/query',
    'Sds/Common/utils',
    'Sds/ExceptionModule/throwEx',
    'Sds/Router/Exception/RouteNotFoundException',
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
    utils,
    throwEx,
    RouteNotFoundException
){
    return {

        // if the base url is undefined, it will be set to the
        // url when the router is started
        baseUrl: undefined,

        dojoBaseUrl: undefined,

        dojoRelativeBaseUrl: false,

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
        controllerManager: undefined,

        active: undefined,

        resolve: function(route){

            var resultDeferred = new Deferred;

            // strip off the base url first
            if (route.indexOf(this.baseUrl) == 0){
                route = route.substring(this.baseUrl.length + 1);
            }

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
                    if (typeof(method) == 'string'){
                        method = {enter: method}
                    }
                    if (controller[method.enter]){
                        resultDeferred.resolve(lang.mixin({route: route, controller: controller, args: args}, method));
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
                this.routes[base.pop()] = {controller: 'Sds/Router/DoNothingController', defaultMethod: 'doNothing'};
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

        go: function(route){
            // route may be a string, which will be routed, or a number which will history.go

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
                    //Route resolved correctly - pushState and call the controller
                    history.pushState({route: result.route}, '', this.baseUrl + '/' + result.route);

                    //If dojo base is a relative path, it may need to be modified
                    if (this.dojoRelativeBaseUrl){
                        var num = result.route.split('/').length - 1;
                        var prepend = '';
                        for (var i = 0; i < num; i++){
                            prepend += '../';
                        }
                        require.baseUrl = prepend + this.dojoBaseUrl;
                    }

                    if (this.active && this.active.leave){
                        this.active.controller[this.active.leave]();
                    }

                    this.active = result;
                    var enter = result.controller[result.enter].apply(result.controller, result.args);
                    if (enter && utils.isDeferred(enter)){
                        //If the enter method returns a deferred, then route
                        //when the deferred resolves
                        enter.then(lang.hitch(this, function(){
                            if (result.onEnterResolveRoute != undefined){
                                this.go(result.onEnterResolveRoute);
                            }
                        }));
                    }
                }),
                function(err){
                    //Route didn't resolve, just go to the url
                    window.location.href = route;
                }
            );
        }
    }
});