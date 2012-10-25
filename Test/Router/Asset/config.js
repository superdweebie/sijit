define([],
function(){
    return {
        serviceManager: {
            'Sds/Router/router': {
                values: {
                    controllers: {
                        'test': 'Sds/Test/Router/Asset/TestController'
                    }
                },
                getObjects: {
                    controllerManager: 'Sds/ServiceManager/Shared/getServiceManager!'
                }
            }
        }
    }
});
