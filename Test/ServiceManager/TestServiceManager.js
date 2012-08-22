define([
        'doh/main',
        'dojo/_base/Deferred',
        'dijit/form/Button',
        'Sds/ServiceManager/ServiceManager'
    ],
    function(
        doh,
        Deferred,
        Button,
        ServiceManager
    ){

        doh.register("Sds.Test.ServiceManager.TestServiceManager", [
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

                var serviceManager = new ServiceManager(defaultConfig);

                doh.assertEqual(defaultConfig, serviceManager.getConfig());

                serviceManager.mergeConfig(customConfig);
                doh.assertEqual(mergedConfig, serviceManager.getConfig());

                doh.assertEqual(defaultConfig.testButton, serviceManager.getObjectConfig('testButton'));

                serviceManager.setObjectConfig('testButton', changedConfig);
                doh.assertEqual(changedConfig, serviceManager.getObjectConfig('testButton'));
            },
            function noConfigTest(){

                var serviceManager = new ServiceManager();
                var deferredTest = new Deferred;
                var zoo;

                // getObject with no config - just module name
                Deferred.when(serviceManager.getObject('Sds/Test/ServiceManager/Asset/Zoo'), function(zoo){
                    doh.assertEqual('the Sds zoo', zoo.name);
                    zoo.name = 'other zoo';

                    // getObject- should return cached Zoo cached with modified name
                    Deferred.when(serviceManager.getObject('Sds/Test/ServiceManager/Asset/Zoo'), function(zoo){
                        doh.assertEqual('other zoo', zoo.name);

                        // createObject - should return new instance of Zoo - with original name
                        Deferred.when(serviceManager.createObject('Sds/Test/ServiceManager/Asset/Zoo'), function(zoo){
                            doh.assertEqual('the Sds zoo', zoo.name);
                            deferredTest.resolve(true);
                        });
                    });
                });

                return deferredTest;
            },
            function valuesConfigTest(){
                var serviceManager = new ServiceManager({
                    'Sds/Test/ServiceManager/Asset/Zoo': {
                        values: {
                            name: 'injected zoo'
                        }
                    }
                });

                var deferredTest = new Deferred;

                // Create with var config
                Deferred.when(serviceManager.createObject('Sds/Test/ServiceManager/Asset/Zoo'), function(zoo){
                    doh.assertEqual('injected zoo', zoo.name);
                    deferredTest.resolve(true);
                });

                return deferredTest;
            },
            function moduleAliasTest(){
                var serviceManager = new ServiceManager();
                serviceManager.setConfig({
                    'zoo': {
                        moduleName: 'Sds/Test/ServiceManager/Asset/Zoo',
                        values: {
                            name: 'alias zoo'
                        }
                    }
                });

                var deferredTest = new Deferred;

                // Create with values config
                Deferred.when(serviceManager.createObject('zoo'), function(zoo){
                    doh.assertEqual('alias zoo', zoo.name);
                    deferredTest.resolve(true);
                });

                return deferredTest;
            },
            function getObjectsTest(){
                var serviceManager = new ServiceManager({
                    'zoo': {
                        moduleName: 'Sds/Test/ServiceManager/Asset/Zoo',
                        values: {
                            name: 'get zoo'
                        },
                        getObjects: {
                            lion: 'Sds/Test/ServiceManager/Asset/Lion'
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
            function createObjectsTest(){
                var serviceManager = new ServiceManager({
                    'zoo': {
                        moduleName: 'Sds/Test/ServiceManager/Asset/Zoo',
                        values: {
                            name: 'create zoo'
                        },
                        createObjects: {
                            lion: 'Sds/Test/ServiceManager/Asset/Lion',
                            lion2: 'Sds/Test/ServiceManager/Asset/Lion'
                        }
                    }
                });

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.createObject('zoo'), function(zoo){
                    doh.assertEqual('create zoo', zoo.name);

                    zoo.lion2.name = 'not lucy';
                    doh.assertEqual('lucy', zoo.lion.name);
                    doh.assertEqual('not lucy', zoo.lion2.name);

                    deferredTest.resolve(true);
                });

                return deferredTest;
            },
            function refObjectTest(){
                var serviceManager = new ServiceManager({
                    'zoo': {
                        moduleName: 'Sds/Test/ServiceManager/Asset/Zoo',
                        values: {
                            name: 'ref zoo'
                        },
                        refObjects: {
                            tiger: 'Sds/Test/ServiceManager/Asset/Tiger'
                        }
                    }
                });

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.createObject('zoo'), function(zoo){
                    doh.assertEqual('ref zoo', zoo.name);
                    doh.assertTrue(zoo.tiger.createObject instanceof Function);
                    doh.assertTrue(zoo.tiger.getObject instanceof Function);
                    Deferred.when(zoo.tiger.getObject(), function(tiger){
                        doh.assertEqual('toby', tiger.name);
                        deferredTest.resolve(true);
                    });
                });

                return deferredTest;
            },
            function injectExistingDijitTest(){

                var button = new Button({id: 'testButton'});

                var serviceManager = new ServiceManager({
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

                var serviceManager = new ServiceManager({
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
                var serviceManager = new ServiceManager({
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
            function serviceManagerAwareTest(){

                var serviceManager = new ServiceManager({
                    'zoo': {
                        moduleName: 'Sds/Test/ServiceManager/Asset/Zoo',
                        values: {
                            name: 'zoo'
                        }
                    }
                });

                Deferred.when(serviceManager.getObject('zoo'), function(zoo){
                    doh.assertEqual(serviceManager, zoo.serviceManager);
                });
            },
            function safeGetPropertyMixinTest(){

                var serviceManager = new ServiceManager({
                    'zoo': {
                        moduleName: 'Sds/Test/ServiceManager/Asset/Zoo',
                        values: {
                            name: 'safe get zoo'
                        },
                        refObjects: {
                            tiger: 'Sds/Test/ServiceManager/Asset/Tiger'
                        }
                    }
                });

                Deferred.when(serviceManager.getObject('zoo'), function(zoo){
                    doh.assertEqual('safe get zoo', zoo.name);
                    Deferred.when(zoo.safeGetProperty('tiger'), function(tiger){
                        doh.assertEqual('toby', tiger.name);
                    });
                });
            }
        ]);
    }
);
