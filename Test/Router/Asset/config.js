define([],
function(){
    return {
        serviceManager: {
            'Sds/Router/router': {
                values: {
                    controllers: {
                        test: {
                            name: 'Sds/Test/Router/Asset/TestController',
                            defaultMethod: 'test1',
                            methods: {
                                test1: 'test1',
                                test2: 'test2',
                                altTest2: 'test2',
                                clear: 'clear'
                            }
                        }
                    }
                }
            }
        }
    }
});
