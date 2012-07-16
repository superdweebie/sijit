define([
        'doh/main',
        'sijit/service/ServiceManager'
    ],
    function(
        doh,
        ServiceManager
    ){


        doh.register("sijit.tests.ServiceManager", [
            function configTest(doh){

                var defaultConfig = {
                    testButton: {
                        moduleName: 'dijit/form/Button',
                        vars: {
                            label: 'Test Button'
                        }
                    }
                };

                var customConfig = {
                    testButton: {
                        moduleName: 'dijit/form/Button',
                        vars: {
                            showLabel: false
                        }
                    }
                };

                var mergedConfig = {
                    testButton: {
                        moduleName: 'dijit/form/Button',
                        vars: {
                            label: 'Test Button',
                            showLabel: false
                        }
                    }
                }

                var serviceManager = ServiceManager.getInstance();
                serviceManager.config = defaultConfig;

                doh.assertEqual(defaultConfig, serviceManager.get('config'));
            }
        ]);
    }
);


