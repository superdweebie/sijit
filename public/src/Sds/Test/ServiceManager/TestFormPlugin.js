define([
        'doh/main',
        'dojo/_base/Deferred',
        'sijit/ServiceManager/ServiceManager',
        'sijit/ServiceManager/Ref',
        'sijit/Form/FormInterface',
        'dojo/Stateful'
    ],
    function(
        doh,
        Deferred,
        ServiceManager,
        Ref,
        FormInterface,
        Stateful
    ){

        doh.register("sijit.ServiceManager.Test.TestFormPlugin", [

            function activateTest(){
                var serviceManager = new ServiceManager({
                    testForm: {
                        moduleName: 'sijit/ServiceManager/Test/Asset/TestForm',
                        plugins: [
                            'sijit/ServiceManager/Plugin/Form'
                        ]
                    }
                });

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.activate('testForm'), function(){
                    Deferred.when(serviceManager.get('testForm', 'value'), function(value){
                        doh.assertEqual('good', value.test);
                        deferredTest.resolve(true);
                    })
                });

                return deferredTest;
            },

            function refTest(){
                var serviceManager = new ServiceManager({
                    testParent: {
                        moduleName: 'sijit/ServiceManager/Test/Asset/TestParent',
                        refObjects: {
                            testForm: 'testForm'
                        }
                    },
                    testForm: {
                        moduleName: 'sijit/ServiceManager/Test/Asset/TestForm',
                        plugins: [
                            'sijit/ServiceManager/Plugin/Form'
                        ]
                    }
                });

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.getObject('testParent'), function(parent){
                    doh.assertTrue(parent.testForm.isInstanceOf(Ref));
                    doh.assertTrue(parent.testForm.isInstanceOf(FormInterface));
                    doh.assertTrue(parent.testForm.isInstanceOf(Stateful));

                    deferredTest.resolve(true);
                });

                return deferredTest;
            }
        ]);
    }
);


