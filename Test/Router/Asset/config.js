define([],
function(){
    return {
        moduleManager: {
            'Sds/Router/router': {
                params: {
                    defaultRoute: 'test/ready',
                    routes: {
                        test: {
                            controller: 'Sds/Test/Router/Asset/TestController',
                            defaultMethod: 'test1',
                            methods: {
                                test1: 'test1',
                                test2: 'test2',
                                altTest2: 'test2',
                                clear: 'clear',
                                ready: 'ready'
                            }
                        },
                        'TestRouter.html': {
                            controller: 'Sds/Test/Router/Asset/TestController',
                            defaultMethod: 'ready'
                        }
                    }
                }
            }
        }
    }
});
