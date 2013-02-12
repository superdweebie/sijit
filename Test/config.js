define([],
function(){
    return {
        moduleManager: {
            'Sds/AuthenticationModule/AuthenticationController': {
                params: {
                    enableRememberMe: true
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
