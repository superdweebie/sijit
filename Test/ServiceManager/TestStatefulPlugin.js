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

        doh.register("Sds.Test.ServiceManager.TestStatefulPlugin", [

            function getTest(){
                var serviceManager = new ServiceManager({
                    dummy: {
                        plugins: [
                            'Sds/ServiceManager/Plugin/Stateful'
                        ]
                    }
                });

                var button = new Button({id: 'getButton'});
                button.set('label', 'get button');

                var deferredTest = new Deferred;

                Deferred.when(serviceManager.get('getButton', 'label'), function(value){
                    doh.assertEqual('get button', value);
                    deferredTest.resolve(true);
                });

                return deferredTest;
            },
            function setTest(){
                var serviceManager = new ServiceManager({
                    dummy: {
                        plugins: [
                            'Sds/ServiceManager/Plugin/Stateful'
                        ]
                    }
                });

                var button = new Button({id: 'setButton'});

                serviceManager.set('setButton', 'label', 'set button');

                doh.assertEqual('set button', button.get('label'));

            },
            function watchTest(){
                var serviceManager = new ServiceManager({
                    dummy: {
                        plugins: [
                            'Sds/ServiceManager/Plugin/Stateful'
                        ]
                    }
                });

                var button = new Button({id: 'watchButton'});

                var deferredTest = new Deferred;

                serviceManager.watch('watchButton', 'label', function(name, oldValue, newValue){
                    doh.assertEqual('label', name);
                    doh.assertEqual('watch button', newValue);
                    deferredTest.resolve(true);
                });

                button.set('label', 'watch button');

                return deferredTest;
            },
            function refStatefulGetTest(){
                var serviceManager = new ServiceManager({
                    'zoo': {
                        moduleName: 'Sds/Test/ServiceManager/Asset/Zoo',
                        values: {
                            name: 'stateful zoo'
                        },
                        refObjects: {
                            tiger: 'Sds/Test/ServiceManager/Asset/Tiger'
                        }
                    },
                    'Sds/Test/ServiceManager/Asset/Tiger': {
                        plugins: [
                            'Sds/ServiceManager/Plugin/Stateful'
                        ]
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
            function refStatefulSetTest(){

                var serviceManager = new ServiceManager({
                    'zoo': {
                        moduleName: 'Sds/Test/ServiceManager/Asset/Zoo',
                        values: {
                            name: 'stateful zoo'
                        },
                        refObjects: {
                            tiger: 'Sds/Test/ServiceManager/Asset/Tiger'
                        }
                    },
                    'Sds/Test/ServiceManager/Asset/Tiger': {
                        plugins: [
                            'Sds/ServiceManager/Plugin/Stateful'
                        ]
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
            function refStatefulWatchTest(){

                var serviceManager = new ServiceManager({
                    'zoo': {
                        moduleName: 'Sds/Test/ServiceManager/Asset/Zoo',
                        values: {
                            name: 'stateful zoo'
                        },
                        refObjects: {
                            tiger: 'Sds/Test/ServiceManager/Asset/Tiger'
                        }
                    },
                    'Sds/Test/ServiceManager/Asset/Tiger': {
                        plugins: [
                            'Sds/ServiceManager/Plugin/Stateful'
                        ]
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
            }
        ]);
    }
);


