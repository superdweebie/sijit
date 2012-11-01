ModuleManager
==============

ModuleManager is a part dependency injection and part registry for dojo modules.

#Creation

There can be multiple instances of the ModuleManager. A moduleManager is created like this:

    require(['Sds/ModuleManager/ModuleManager'], function(ModuleManager){
        var moduleManager = new ModuleManager();
    }

#Config

The moduleManager's behaviour is controled by a config object. The config object can be passed
in a number of different ways.

The config object can be explicitly passed to the constructor:

    var moduleManager = new ModuleManager({/*put configuration here*/});

The config object can be set after the module manager has been created:

    moduleManager.setConfig({/*put configuration here*/});

If no config object is supplied to the constructor, the `moduleManager` key
from the dojo config object will be used.

The a config object can be merged with the existing moduleManager config using
the `mergeConfig` method:

    moduleManager.mergeConfig({/*put config to merge here*/});

The config for an individual identifier can be set with:

    moduleManager.setIdentifierConfig(identifier, {/* put config here*/});

The config object is an array of identifiers and the dependencies that should
be injected into them. For example:

    {
        object1: {
            mid: 'MyNamespace/MyClass1'
        }
    }

This config defines two identifiers, `object1` and `object2`. Each identifier also has a `moduleName`
defined. The following call to `get` would return an instance of `MyNamespace/MyClass1`

    var myObject1 = moduleManager.get('object1');

Just returning an instance isn't very useful. There are other config keys that give
the ModuleManager real power. The first is `params`. For example:

    {
        object1: {
            mid: 'MyNamespace/MyClass1'
            params: {
                a: 1,
                b: 'hello'
            }
        },
        object2: {
            mid: 'MyNamespace/MyClass1'
            params: {
                a: 2,
                b: 'hello again'
            }
        }
    }

Calling `moduleManager.get('object1')` with this config would return an instance
of `MyNamespace/MyClass1` with the properties `a` and `b` set to the values given
in the config. Calling `moduleManager.get('object2')` would return a different
instance of `MyNamespace/MyClass1` with the different properties, as given in the config.

A this point the difference between three important ModuleManager functions needs
to be explained:

`get(identifier)` will return an instnace of the object with the given identifier. If the identifier
is being called for the first time, the instance will be created and cached inside the
moduleManager. If `get(identifier)` is called again, the cached instance will be returned. `get` will
return a Deferred if the object needs to be created, and syncronously if the object is retrieved
from cache.

`proxy(identifier)` will return a Proxy object that can be used to proxy the real isntance. See below for
more detail about Proxy objects. `proxy` will always return syncronously.

If there is ever a need to flush the moduleManager cache, it can be done with `clearCache()`.

Asside from injecting values, a ModuleManager can also inject objects. Eg:

    {
        object1: {
            mid: 'MyNamespace/MyClass1'
            params: {
                a: 1,
                b: 'hello'
            },
            gets: {
                c: 'object2'
                d: 'object3'
            },
            proxies: {
                e: 'object4'
            }
        },
        object2: {
            mid: 'MyNamespace/MyClass2'
        },
        object3: {
            mid: 'MyNamespace/MyClass2'
        },
        object4: {
            mid: 'MyNamespace/MyClass2'
        },
    }

Calling `get('object1])` with the above config will do lots of cool stuff:

    - It will inject values  into properties `a` and `b`
    - It will create an instance of object2 and inject it into property `c`
    - It will create an instnace of object3, and inject it into property `d`
    - It will create a Proxy object which points to object4, and inject it into property `e`

Object injections can be nested as deeply as you wish. If you have need of circular dependencies,
then use a Proxy object, otherwise the ModuleManager will get stuck in an endless loop.

When injecting objects, the moduleManager will check the module to see if it has a prototype.
If it does, then it will create a new instance, and inject that. If it does not, then it
will inject a clone of the module.


#Proxy Objects

Proxy objects hold a proxy to an identifier, but are not the actual identifier. Proxy objects
allow lazy loading of dependencies. Proxy objects have one basic method `moduleManagerGet`.
This can be called to return the object that the Proxy references.

Proxy objects can also be extended to proxy the funtions of the object they reference. This
can be done through the `proxyMethods` config key. This config key must be an array
of method names that exist on the module. For example:

    {
        object1: {
            mid: 'MyNamespace/MyClass1'
            proxies: {
                a: 'object2'
            }
        },
        object2: {
            mid: 'MyNamespace/MyClass2'
            proxyMethods: [
                'method1',
                'method2'
            ]
        },
    }

When `get('object1')` is called, it will return an instance with property
`a` set with an instance of a Proxy object pointing to object2. However, along with
the normal Proxy method of `moduleManagerGet()`, the Proxy will have two
additional methods, `method1()` and `method2()`. Calling either of these methods
on the Proxy object will first load object2, then call the method of the same name
on object2. Any arguments passed to `proxy.method1()` will be passed down to
`object2.method1()`. `proxy.method1()` will return a Deferred which will resolve
to the return value of `object2.method1()`.

#ModuleManagerAware

If an object created with a moduleManager has a `isModuleManagerAware` property that
evaluates to true, then that object will have its `moduleManager` property injected with
the moduleManager that created it.

For convinience, inheriting from `ModuleManagerAwareMixin` will do this for you.

#AMD Plugins

Several AMD plugins are provided to make working with the ModuleManager simple.
The first gets an instnace of the shared moduleManager. This moduleManager instance
is created the first time the `getModuleManager` plugin is called, and the instance
is cached inside the plugin. The instance will be configured with the `moduleManager` key
from the dojo config object. Eg:

    require(['Sds/ModuleManager/Shared/getModuleManager!'], function(moduleManager){
        var myObject = moduleManager.get('myObject');
    })

Plugins are also provided for `get` and `proxy`. Each of these
plugins takes an identifier that will be fetched from the shared moduleManager. Eg:

    require(['Sds/ModuleManager/Shared/get!MyObject'], function(myObject){
        //Do something with myObject
    })

#Dojo Builds

A dojo build system plugin resolver is provided for each of the AMD plugins. To use
these plugins add the following to your root build profile:

    plugins:{
        "Sds/ModuleManager/get":"Sds/Build/plugin/get",
        "Sds/ModuleManager/proxy":"Sds/Build/plugin/proxy",
        "Sds/ModuleManager/getModuleManager":"Sds/Build/plugin/getModuleManager"
    }

Each plugin will give the following behaviour when building a layer:

##get!

Will include the ModuleManager, and the module requested by get!, and any modules
in the gets property of the config for that object.

##proxy!

Will include the ModuleManager, but not the module requested by proxy!.

##getModuleManager!

Will include the ModuleManager

To get the most out of the build system plugin resolvers, it is recomended that you
use the build profile preprocessor. This will merge any required config modules, and
add the plugins automatically.