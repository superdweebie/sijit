define([],
function(){
    return {
        moduleManager: {
            'Sds/Router/router': {
                params: {
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
