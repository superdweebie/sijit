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

                //Get instance with no mid set.
                //When no mid is set, the mid is assumed to be the config property name
                //This will return an instnace of Sds/Test/ModuleManager/Asset/Zoo
                'Sds/Test/ModuleManager/Asset/Zoo': {
                },

                //Create with mid set:
                //This will return an instnace of Sds/Test/ModuleManager/Asset/Zoo
                'zooWithMid': {
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo'
                },

                //Create instance and mixin some params:
                //This will return an instnace of Sds/Test/ModuleManager/Asset/Zoo,
                //and mixin values from the params object into the instance
                'zooParams': {
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
                    params: {
                        name: 'Zoo with param'
                    }
                },

                //Return module with params mixedin
                'foodsParams': {
                    mid: 'Sds/Test/ModuleManager/Asset/foods',
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
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        declare: false
                    },
                    params: {
                        name: 'Zoo instance'
                    }
                },

                //Declare: true
                //It tells the module manager to use dojo/_base/declare to extend
                //the mid with the injections and return the result of declare.
                //This effectively declares a new module. Note that a constructor
                //will be returned, not an instnace.
                'ZooDeclareTrue': {
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
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
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
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
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        cache: false
                    },
                    params: {
                        name: 'Zoo cache false'
                    }
                },

                //define: false
                //This is the default setting. Tells the module manager not to create a new
                //mid from this config.
                'zooDefineFalse': {
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        define: false
                    },
                    params: {
                        name: 'Zoo define false'
                    }
                },

                //define: true
                //Tells the moduleManager to use dojo/_base/define to create a new mid.
                //After this object has been got, the following code will work:
                //
                //require('zooDefineTrue', function(zooDefineTrue){
                //    console.debug(ZooDefineMidTrue.name) //prints 'Zoo defineMid true'
                //})
                //
                'zooDefineTrue': {
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        define: true
                    },
                    params: {
                        name: 'Zoo define true'
                    }
                },

                //define: true
                //Demonstrates defineMid for a module which does not have a declare
                //
                'foodsDefineTrue': {
                    mid: 'Sds/Test/ModuleManager/Asset/foods',
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
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
                    directives: {
                        declare: true,
                        define: true
                    },
                    params: {
                        name: 'Zoo declared and defined'
                    }
                },

                'lion1': {
                    mid: 'Sds/Test/ModuleManager/Asset/Lion'
                },

                'lion2': {
                    mid: 'Sds/Test/ModuleManager/Asset/Lion',
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
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
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
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
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
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
                    params: {
                        name: 'Zoo with nested gets config'
                    },
                    gets: {
                        tiger: {
                            mid: 'Sds/Test/ModuleManager/Asset/Tiger',
                            params: {
                                name: 'tim'
                            }
                        },
                        cage: [
                            'lion2',
                            {
                                mid: 'Sds/Test/ModuleManager/Asset/Lion',
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
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
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
                    mid: 'Sds/Test/ModuleManager/Asset/Tiger',
                    proxyMethods: [
                        'makeSound'
                    ]
                },

                //Proxies can also be inject in the same way as gets
                'zooWithProxies': {
                    mid: 'Sds/Test/ModuleManager/Asset/Zoo',
                    proxyMethods: [
                        'listAnimals'
                    ],
                    params: {
                        name: 'Zoo with proxies'
                    },
                    proxies: {
                        tiger: 'tigerWithProxyMethods'
                    }
                }
            }
        }
    }
);

