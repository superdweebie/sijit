define([
        'doh/main',
        'dojo/Deferred',
        'dojo/DeferredList',
        'dojo/when',
        'Sds/ServiceManager/ServiceManager',
        'Sds/ServiceManager/Proxy'
    ],
    function(
        doh,
        Deferred,
        when,
        DeferredList,
        ServiceManager,
        Proxy
    ){

        doh.register("Sds/Test/ServiceManager/TestProxyProxyMethods", [

            function proxyTest(){
                var serviceManager = new ServiceManager({
                    testParent: {
                        moduleName: 'Sds/Test/ServiceManager/Asset/TestParent',
                        proxyObjects: {
                            testView: 'testView'
                        }
                    },
                    testView: {
                        moduleName: 'Sds/Test/ServiceManager/Asset/TestView',
                        proxyMethods: [
                            'activate',
                            'reset',
                            'get',
                            'set',
                            'watch'
                        ]
                    }
                });

                var deferredTest = new Deferred;

                when(serviceManager.getObject('testParent'), function(parent){

                    doh.assertTrue(parent.testView.isInstanceOf(Proxy));

                    var deferredList = new DeferredList([
                        parent.testView.get('value'),
                        parent.testView.activate('test')
                    ]);

                    deferredList.then(function(result){
                        doh.assertEqual('working', result[0][1]);
                        doh.assertEqual('test', result[1][1]);
                        deferredTest.resolve(true);
                    })
                });

                return deferredTest;
            }
        ]);
    }
);


