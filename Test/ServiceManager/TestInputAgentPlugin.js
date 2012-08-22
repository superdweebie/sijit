define([
        'doh/main',
        'dojo/_base/Deferred',
        'Sds/ServiceManager/ServiceManager',
        'Sds/ServiceManager/Ref',
        'Sds/InputAgent/BaseInputAgent',
        'dojo/Stateful'
    ],
    function(
        doh,
        Deferred,
        ServiceManager,
        Ref,
        BaseInputAgent,
        Stateful
    ){

        doh.register("Sds.Test.ServiceManager.TestInputAgentPlugin", [

            function activateTest(){
                var serviceManager = new ServiceManager({
                    testInputAgent: {
                        moduleName: 'Sds/Test/ServiceManager/Asset/TestInputAgent',
                        plugins: [
                            'Sds/ServiceManager/Plugin/InputAgent'
                        ]
                    }
                });

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.activate('testInputAgent'), function(){
                    Deferred.when(serviceManager.get('testInputAgent', 'value'), function(value){
                        doh.assertEqual('good', value.test);
                        deferredTest.resolve(true);
                    })
                });

                return deferredTest;
            },

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
                        plugins: [
                            'Sds/ServiceManager/Plugin/InputAgent'
                        ]
                    }
                });

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.getObject('testParent'), function(parent){
                    doh.assertTrue(parent.testInputAgent.isInstanceOf(Ref));
                    doh.assertTrue(parent.testInputAgent.isInstanceOf(BaseInputAgent));
                    doh.assertTrue(parent.testInputAgent.isInstanceOf(Stateful));

                    deferredTest.resolve(true);
                });

                return deferredTest;
            }
        ]);
    }
);


