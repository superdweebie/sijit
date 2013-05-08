define([],
function(){
    return {
        moduleManager: {
            'Sds/Router/router': {
                gets: {
                    controllerManager: 'Sds/ModuleManager/Shared/getModuleManager!'
                },
                params: {
                    routes: {
                        back: {
                            defaultMethod: -1
                        },
                        forward: {
                            defaultMethod: 1
                        }
                    }
                }
            }
        }
    }
});
