define(
    ['Sds/AuthenticationModule/Smd'],
    function(smd){
        return {
            serviceManager: {
                authenticationController: {
                    moduleName: 'Sds/AuthenticationModule/AuthenticationController',
                    values: {
                        apiSmd: smd
                    },
                    proxyObjects: {
                        loginView: 'loginView'
                    }
                },
                loginView: {
                    moduleName: 'Sds/AuthenticationModule/View/Login',
                    proxyMethods: [
                        'activate',
                        'reset',
                        'get',
                        'set',
                        'watch'
                    ],
                    proxyObjects: {
                        identityController: 'identityController'
                    }
                }
            }
        }
    }
);
