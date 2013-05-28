define([],
function(){
    return {
        moduleManager: {
            'Sds/Router/router': {
                params: {
                    routes: [
                        {
                            regex: /test/,
                            controller: 'Sds/Test/Router/Asset/TestController',
                            defaultMethod: {
                                enter: 'test1',
                                exit: 'exit'
                            },
                            methods: {
                                test1: 'test1',
                                test2: 'test2',
                                altTest2: {
                                    enter: 'test2',
                                    exit: 'altExit'
                                },
                                clear: 'clear',
                                ready: 'ready'
                            }
                        },
                        {
                            regex: /[a-zA-Z][a-zA-Z0-9/_-]+.html/,
                            controller: 'Sds/Test/Router/Asset/TestController',
                            defaultMethod: {
                                enter: 'ready',
                                exit: 'exit'
                            }
                        }
                    ]
                }
            }
        }
    }
});
