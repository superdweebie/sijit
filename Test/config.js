define([],
function(){
    return {
        moduleManager: {
            'Sds/AuthenticationModule/AuthenticationController': {
                params: {
                    enableRememberMe: true,
                    restUrl: 'http://localhost/ZendSkeletonApplication/authenticatedIdentity/'
                },
                proxies: {
                    loginView: 'Sds/AuthenticationModule/View/Login'
                }
            },
            'Sds/ExceptionModule/ExceptionController': {
                params: {
                    logLevel: 0,
                    displayLevel: 100
                }
            }
        }
    }
});
