define([
        'doh/main',
        'dojo/Deferred',
        'dojo/DeferredList',
        'dojo/when',
        'Sds/ServiceManager/ServiceManager',
        'Sds/ServiceManager/Ref'
    ],
    function(
        doh,
        Deferred,
        when,
        DeferredList,
        ServiceManager,
        Ref
    ){

        doh.register("Sds.Test.ServiceManager.TestRefProxyMethods", [

            function refTest(){
                var serviceManager = new ServiceManager({
                    testParent: {
                        moduleName: 'Sds/Test/ServiceManager/Asset/TestParent',
                        refObjects: {
                            testInputAgent: 'testInputAgent'
                        }
                    },
                    testInputAgent: {
                        moduleName: 'Sds/Test/ServiceManager/Asset/TestInputAgent',
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

                    doh.assertTrue(parent.testInputAgent.isInstanceOf(Ref));

                    var deferredList = new DeferredList([
                        parent.testInputAgent.get('value'),
                        parent.testInputAgent.activate('test')
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


