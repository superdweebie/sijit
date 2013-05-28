define([],
function(){
    return {
        moduleManager: {
            'Sds/Router/router': {
                gets: {
                    controllerManager: 'Sds/ModuleManager/Shared/getModuleManager!'
                },
                params: {
                    routes: [
                        {
                            regex: /[a-zA-Z][a-zA-Z0-9/_-]+/, //the catch all route
                            ignore: true
                        },
                        {
                            regex: /back/,
                            defaultMethod: -1
                        },
                        {
                            regex: /forward/,
                            defaultMethod: 1
                        }
                    ]
                }
            }
        }
    }
});
