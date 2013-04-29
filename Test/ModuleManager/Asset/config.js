define(
    [],
    function(){
        return {
            moduleManager: {

                //
                //The default directives are:
                //directives: {
                //    declare: false,
                //    define: false,
                //    cache: true
                //}

                //Get instance with no base set.
                //When no base is set, the base is assumed to be the config property name
                //This will return an instnace of Sds/Test/ModuleManager/Asset/Penguin
                'Sds/Test/ModuleManager/Asset/Penguin': {
                    params: {
                        name: 'kate'
                    }
                },

                //Create with base set:
                //This will return an instnace of Sds/Test/ModuleManager/Asset/Zoo
                'zooWithBase': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo'
                },

                //Base set to another identifier
                //If the base is set to another configured identifier, it will return
                //the object described by that identifier
                'zooIdentifierBase': {
                    base: 'zooWithBase'
                },

                //If the base is set to an object, that object will be injected
                'objectBase': {
                    base: {name: 'tim'},
                    params: {
                        name: 'alan'
                    }
                },

                //Create instance and mixin some params:
                //This will return an instnace of Sds/Test/ModuleManager/Asset/Zoo,
                //and mixin values from the params object into the instance
                'zooParams': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    params: {
                        name: 'Zoo with param'
                    }
                },

                //Return module with params mixedin
                'foodsParams': {
                    base: 'Sds/Test/ModuleManager/Asset/foods',
                    params: {
                        penguin: 'fish',
                        meerkat: 'grubs'
                    }
                },

                //Declare: false explicitly set
                //This is the default setting for directives.declare.
                //It tells the module manager to create a new intance of the
                //module and return that, if the module has a declare
                'zooDeclareFalse': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        declare: false
                    },
                    params: {
                        name: 'Zoo instance'
                    }
                },

                //Declare: true
                //It tells the module manager to use dojo/_base/declare to extend
                //the base with the injections and return the result of declare.
                //This effectively declares a new module. Note that a constructor
                //will be returned, not an instnace.
                'ZooDeclareTrue': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        declare: true
                    },
                    params: {
                        name: 'Zoo extended'
                    }
                },

                //cache: true
                //Tells the module manager to cache this result.
                //The next time get is called, the cached result will be returned.
                //directives.cache: true is the default setting
                'zooCacheTrue': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        cache: true
                    },
                    params: {
                        name: 'Zoo cache true'
                    }
                },

                //cache: false
                //Tells the module manager not to cache this result.
                //The next time get is called, the a new instnace will be created.
                'zooCacheFalse': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        cache: false
                    },
                    params: {
                        name: 'Zoo cache false'
                    }
                },

                //define: false
                //This is the default setting. Tells the module manager not to create a new
                //base from this config.
                'zooDefineFalse': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        define: false
                    },
                    params: {
                        name: 'Zoo define false'
                    }
                },

                //define: true
                //Tells the moduleManager to use dojo/_base/define to create a new base.
                //After this object has been got, the following code will work:
                //
                //require('zooDefineTrue', function(zooDefineTrue){
                //    console.debug(ZooDefineBaseTrue.name) //prints 'Zoo defineBase true'
                //})
                //
                'zooDefineTrue': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        define: true
                    },
                    params: {
                        name: 'Zoo define true'
                    }
                },

                //define: true
                //Demonstrates defineBase for a module which does not have a declare
                //
                'foodsDefineTrue': {
                    base: 'Sds/Test/ModuleManager/Asset/foods',
                    directives: {
                        define: true
                    },
                    params: {
                        penguin: 'fish',
                        meerkat: 'grubs'
                    }
                },

                //Declare: true and Define: true
                //This combination effectively creates a new module that can
                //be loaded normally with the AMD loader: ie require(['ZooDeclareAndDefine'], function(){})
                'ZooDeclareAndDefine': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        declare: true,
                        define: true
                    },
                    params: {
                        name: 'Zoo declared and defined'
                    }
                },

                'lion1': {
                    base: 'Sds/Test/ModuleManager/Asset/Lion'
                },

                'lion2': {
                    base: 'Sds/Test/ModuleManager/Asset/Lion',
                    params: {
                        name: 'liz'
                    }
                },

                //Gets
                //This object will be injected with the object listed in the gets property.
                //Each object will be injected from a moduleManager.get call.
                //This particular zoo will get the instances of lion1 and lion2
                //configured directly above
                'zooWithGets': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    params: {
                        name: 'Zoo with gets'
                    },
                    gets: {
                        lion1: 'lion1',
                        lion2: 'lion2',
                        tiger: 'Sds/Test/ModuleManager/Asset/Tiger'
                    }
                },

                //Gets with array
                //This will inject an array of objects created with moduleManager.get
                'zooWithGetsArray': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    params: {
                        name: 'Zoo with gets array'
                    },
                    gets: {
                        cage: [
                            'lion1',
                            'lion2'
                        ]
                    }
                },

                //Gets with nested config
                //Any time get is passed an object, it will treat that object as
                //the config for creating the object, rather than looking for
                //and identifier in the moduleManager config
                'zooWithNestedGetsConfig': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    params: {
                        name: 'Zoo with nested gets config'
                    },
                    gets: {
                        tiger: {
                            base: 'Sds/Test/ModuleManager/Asset/Tiger',
                            params: {
                                name: 'tim'
                            }
                        },
                        cage: [
                            'lion2',
                            {
                                base: 'Sds/Test/ModuleManager/Asset/Lion',
                                params: {
                                    name: 'emma'
                                }
                            }
                        ]
                    }
                },

                //Proxy Methods
                //Rather than getting an object, the moduleManager can get a
                //proxy to an object. Proxies mean that the acutal module
                //is not loaded by the AMD loader until a method is called.
                //All proxies have a `moduleManagerGet` method that can be used
                //to get the object. Proxies will also have any methods defined by
                //the proxyMethods key. If any of these methods are called, the
                //underling object will be loaded, the method called, and the result
                //passed back through the proxy.
                'zooWithProxyMethods': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    proxyMethods: [
                        'listAnimals'
                    ],
                    params: {
                        name: 'Zoo with proxy'
                    },
                    gets: {
                        lion1: 'lion1',
                        lion2: 'lion2',
                        tiger: 'Sds/Test/ModuleManager/Asset/Tiger'
                    }
                },

                'tigerWithProxyMethods': {
                    base: 'Sds/Test/ModuleManager/Asset/Tiger',
                    params: {
                        name: 'Josh'
                    },
                    proxyMethods: [
                        'makeSound'
                    ]
                },

                //Proxies can also be inject in the same way as gets
                'zooWithProxies': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    proxyMethods: [
                        'listAnimals'
                    ],
                    params: {
                        name: 'Zoo with proxies'
                    },
                    proxies: {
                        tiger: 'tigerWithProxyMethods',
                        cage: [
                            'lion2',
                            {
                                base: 'Sds/Test/ModuleManager/Asset/Lion',
                                params: {
                                    name: 'emma'
                                }
                            }
                        ]
                    }
                },

                //Array injections can be spread across params, gets and proxies
                'zooWithSpreadArray': {
                    base: 'Sds/Test/ModuleManager/Asset/Zoo',
                    params: {
                        animals: [
                            'cobra',
                            'crocodile'
                        ]
                    },
                    gets: {
                        animals: [
                            'lion1',
                            'lion2'
                        ]
                    },
                    proxies: {
                        animals: [
                            'tigerWithProxyMethods'
                        ]
                    }
                }
            }
        }
    }
);

