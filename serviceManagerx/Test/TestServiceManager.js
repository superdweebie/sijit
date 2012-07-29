define([
        'doh/main',
        'dojo/_base/Deferred',
        'dijit/form/Button',
        'sijit/serviceManager/ServiceManager'
    ],
    function(
        doh,
        Deferred,
        Button,
        ServiceManager
    ){

        doh.register("sijit.serviceManager.tests.TestServiceManager", [
            function configTest(doh){

                var defaultConfig = {
                    testButton: {
                        moduleName: 'dijit/form/Button',
                        values: {
                            label: 'Test Button'
                        }
                    }
                };

                var customConfig = {
                    testButton: {
                        moduleName: 'dijit/form/Button',
                        values: {
                            showLabel: false
                        }
                    }
                };

                var mergedConfig = {
                    testButton: {
                        moduleName: 'dijit/form/Button',
                        values: {
                            label: 'Test Button',
                            showLabel: false
                        }
                    }
                }

                var changedConfig = {
                    moduleName: 'dijit/form/Button',
                    values: {
                        label: 'changed'
                    }
                };

                var serviceManager = ServiceManager.getInstance();

                serviceManager.setConfig(defaultConfig);
                doh.assertEqual(defaultConfig, serviceManager.getConfig());

                serviceManager.mergeConfig(customConfig);
                doh.assertEqual(mergedConfig, serviceManager.getConfig());

                doh.assertEqual(defaultConfig.testButton, serviceManager.getObjectConfig('testButton'));

                serviceManager.setObjectConfig('testButton', changedConfig);
                doh.assertEqual(changedConfig, serviceManager.getObjectConfig('testButton'));
            },
            function noConfigTest(){

                var serviceManager = ServiceManager.getInstance();
                var deferredTest = new Deferred;
                var zoo;

                // getObject with no config - just module name
                Deferred.when(serviceManager.getObject('sijit/serviceManager/tests/asset/Zoo'), function(zoo){
                    doh.assertEqual('the sijit zoo', zoo.name);
                    zoo.name = 'other zoo';

                    // getObject- should return cached Zoo cached with modified name
                    Deferred.when(serviceManager.getObject('sijit/serviceManager/tests/asset/Zoo'), function(zoo){
                        doh.assertEqual('other zoo', zoo.name);

                        // createObject - should return new instance of Zoo - with original name
                        Deferred.when(serviceManager.createObject('sijit/serviceManager/tests/asset/Zoo'), function(zoo){
                            doh.assertEqual('the sijit zoo', zoo.name);
                            deferredTest.resolve(true);
                        });
                    });
                });

                return deferredTest;
            },
            function varConfigTest(){
                var serviceManager = ServiceManager.getInstance();
                serviceManager.setConfig({
                    'sijit/serviceManager/tests/asset/Zoo': {
                        values: {
                            name: 'injected zoo'
                        }
                    }
                });

                var deferredTest = new Deferred;

                // Create with var config
                Deferred.when(serviceManager.createObject('sijit/serviceManager/tests/asset/Zoo'), function(zoo){
                    doh.assertEqual('injected zoo', zoo.name);
                    deferredTest.resolve(true);
                });

                return deferredTest;
            },
            function moduleAliasTest(){
                var serviceManager = ServiceManager.getInstance();
                serviceManager.setConfig({
                    'zoo': {
                        moduleName: 'sijit/serviceManager/tests/asset/Zoo',
                        values: {
                            name: 'alias zoo'
                        }
                    }
                });

                var deferredTest = new Deferred;

                // Create with var config
                Deferred.when(serviceManager.createObject('zoo'), function(zoo){
                    doh.assertEqual('alias zoo', zoo.name);
                    deferredTest.resolve(true);
                });

                return deferredTest;
            },
            function getObjectsTest(){
                var serviceManager = ServiceManager.getInstance();
                serviceManager.setConfig({
                    'zoo': {
                        moduleName: 'sijit/serviceManager/tests/asset/Zoo',
                        values: {
                            name: 'get zoo'
                        },
                        getObjects: {
                            lion: 'sijit/serviceManager/tests/asset/Lion'
                        }
                    }
                });

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.createObject('zoo'), function(zoo){
                    doh.assertEqual('get zoo', zoo.name);
                    doh.assertEqual('lucy', zoo.lion.name);
                    deferredTest.resolve(true);
                });

                return deferredTest;
            },
            function asyncObjectTest(){
                var serviceManager = ServiceManager.getInstance();
                serviceManager.setConfig({
                    'zoo': {
                        moduleName: 'sijit/serviceManager/tests/asset/Zoo',
                        values: {
                            name: 'async zoo'
                        },
                        refObjects: {
                            tiger: 'sijit/serviceManager/tests/asset/Tiger'
                        }
                    }
                });

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.createObject('zoo'), function(zoo){
                    doh.assertEqual('async zoo', zoo.name);
                    doh.assertTrue(zoo.tiger.createObject instanceof Function);
                    doh.assertTrue(zoo.tiger.getObject instanceof Function);
                    Deferred.when(zoo.tiger.getObject(), function(tiger){
                        doh.assertEqual('toby', tiger.name);
                        deferredTest.resolve(true);
                    });
                });

                return deferredTest;
            },
            function asyncStatefulGetTest(){
                var serviceManager = ServiceManager.getInstance();
                serviceManager.setConfig({
                    'zoo': {
                        moduleName: 'sijit/serviceManager/tests/asset/Zoo',
                        values: {
                            name: 'stateful zoo'
                        },
                        refObjects: {
                            tiger: 'sijit/serviceManager/tests/asset/Tiger'
                        }
                    },
                    'sijit/serviceManager/tests/asset/Tiger': {
                        isStateful: true
                    }
                });

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.createObject('zoo'), function(zoo){
                    doh.assertEqual('stateful zoo', zoo.name);
                    doh.assertTrue(zoo.tiger.get instanceof Function);

                    Deferred.when(zoo.tiger.get('name'), function(value){
                        doh.assertEqual('toby', value);
                        deferredTest.resolve(true);
                    })
                });

                return deferredTest;
            },
            function asyncStatefulSetTest(){

                var serviceManager = ServiceManager.getInstance();
                serviceManager.clearInstanceCache();

                serviceManager.setConfig({
                    'zoo': {
                        moduleName: 'sijit/serviceManager/tests/asset/Zoo',
                        values: {
                            name: 'stateful zoo'
                        },
                        refObjects: {
                            tiger: 'sijit/serviceManager/tests/asset/Tiger'
                        }
                    },
                    'sijit/serviceManager/tests/asset/Tiger': {
                        isStateful: true
                    }
                });

                var deferredTest = new Deferred;
                var deferredSet = new Deferred;

                Deferred.when(serviceManager.createObject('zoo'), function(zoo){
                    doh.assertEqual('stateful zoo', zoo.name);
                    doh.assertTrue(zoo.tiger.set instanceof Function);

                    Deferred.when(zoo.tiger.set('name', 'diff name'), function(){
                        deferredSet.resolve();
                    })
                });

                deferredSet.then(function(){
                    Deferred.when(serviceManager.getObject('zoo'), function(zoo){
                        Deferred.when(zoo.tiger.get('name'), function(value){
                            doh.assertEqual('diff name', value);
                            deferredTest.resolve(true);
                        })
                    })
                });

                return deferredTest;
            },
            function asyncStatefulWatchTest(){

                var serviceManager = ServiceManager.getInstance();
                serviceManager.clearInstanceCache();

                serviceManager.setConfig({
                    'zoo': {
                        moduleName: 'sijit/serviceManager/tests/asset/Zoo',
                        values: {
                            name: 'stateful zoo'
                        },
                        refObjects: {
                            tiger: 'sijit/serviceManager/tests/asset/Tiger'
                        }
                    },
                    'sijit/serviceManager/tests/asset/Tiger': {
                        isStateful: true
                    }
                });

                var deferredTest = new Deferred;
                var deferredWatch = new Deferred;

                Deferred.when(serviceManager.createObject('zoo'), function(zoo){
                    doh.assertEqual('stateful zoo', zoo.name);
                    doh.assertTrue(zoo.tiger.watch instanceof Function);

                    Deferred.when(
                        zoo.tiger.watch(
                            'name',
                            function(property, oldValue, newValue){
                                doh.assertEqual('name', property);
                                doh.assertEqual('watch Name', newValue);
                                deferredTest.resolve(true);
                            }
                        ),
                        function(){
                            deferredWatch.resolve();
                        }
                    )
                });

                deferredWatch.then(function(){
                    Deferred.when(serviceManager.getObject('zoo'), function(zoo){
                        zoo.tiger.set('name', 'watch Name');
                    })
                });

                return deferredTest;
            },
            function injectExistingDijitTest(){

                var button = new Button({id: 'testButton'});

                var serviceManager = ServiceManager.getInstance();
                serviceManager.setConfig({
                    'testButton': {
                        values: {
                            label: 'test Button'
                        }
                    }
                });

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.getObject('testButton'), function(button){
                    doh.assertEqual('test Button', button.get('label'));
                    deferredTest.resolve(true);
                });

                return deferredTest;
            },
            function injectDijitOnCreateTest(){

                var serviceManager = ServiceManager.getInstance();
                serviceManager.setConfig({
                    'injectedButton': {
                        values: {
                            label: 'injected Button'
                        }
                    }
                });

                var button = new Button({id: 'injectedButton'});

                doh.assertEqual('injected Button', button.get('label'));
            },
            function dijitIdAliasTest(){
                var serviceManager = ServiceManager.getInstance();
                serviceManager.setConfig({
                    'aliasButton': {
                        dijitId: 'anotherButton',
                        values: {
                            label: 'alias Button'
                        }
                    }
                });

                var button = new Button({id: 'anotherButton'});

                doh.assertEqual('alias Button', button.get('label'));
            },
            function getTest(){
                var serviceManager = ServiceManager.getInstance();

                var button = new Button({id: 'getButton'});
                button.set('label', 'get button');

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.get('getButton', 'label'), function(value){
                    doh.assertEqual('get button', button.get('label'));
                    deferredTest.resolve(true);
                });

                return deferredTest;
            },
            function setTest(){
                var serviceManager = ServiceManager.getInstance();

                var button = new Button({id: 'setButton'});

                serviceManager.set('setButton', 'label', 'set button');

                doh.assertEqual('set button', button.get('label'));

            },
            function watchTest(){

                var serviceManager = ServiceManager.getInstance();

                var button = new Button({id: 'watchButton'});

                var deferredTest = new Deferred;

                serviceManager.watch('watchButton', 'label', function(name, oldValue, newValue){
                    doh.assertEqual('label', name);
                    doh.assertEqual('watch button', newValue);
                    deferredTest.resolve(true);
                });

                button.set('label', 'watch button');

                return deferredTest;
            }
        ]);
    }
);


