ServiceManager
==============

ServiceManager is a part dependency injection and part registry for dojo modules.

#Creation

There can be multiple instances of the ServiceManager. A serviceManager is created like this:

    require(['Sds/ServiceManager/ServiceManager'], function(ServiceManager){
        var serviceManager = new ServiceManager();
    }

#Config

The serviceManager's behaviour is controled by a config object. The config object can be passed
in a number of different ways.

The config object can be explicitly passed to the constructor:

    var serviceManager = new ServiceManager({/*put configuration here*/});

The config object can be set after the service manager has been created:

    serviceManager.setConfig({/*put configuration here*/});

If no config object is supplied to the constructor, the `service_manager` key
from the dojo config object will be used.

The a config object can be merged with the existing serviceManager config using
the `mergeConfig` method:

    serviceManager.mergeConfig({/*put config to merge here*/});

The config for an individual identifier can be set with:

    serviceManager.setObjectConfig(identifier, {/* put config here*/});

The config object is an array of identifiers and the dependencies that should
be injected into them. For example:

    {
        object1: {
            moduleName: 'MyNamespace/MyClass1'
        }
    }

This config defines two identifiers, `object1` and `object2`. Each identifier also has a `moduleName`
defined. The following call to `getObject` would return an instance of `MyNamespace/MyClass1`

    var myObject1 = serviceManager.getObject('object1');

Just returning an instance isn't very useful. There are other config keys that give
the ServiceManager real power. The first is `values`. For example:

    {
        object1: {
            moduleName: 'MyNamespace/MyClass1'
            values: {
                a: 1,
                b: 'hello'
            }
        },
        object2: {
            moduleName: 'MyNamespace/MyClass1'
            values: {
                a: 2,
                b: 'hello again'
            }
        }
    }

Calling `serviceManager.getObject('object1')` with this config would return an instance
of `MyNamespace/MyClass1` with the properties `a` and `b` set to the values given
in the config. Calling `serviceManager.getObject('object2')` would return a different
instance of `MyNamespace/MyClass1` with the different properties, as given in the config.

A this point the difference between three important ServiceManager functions needs
to be explained:

`getObject(identifier)` will return an instnace of the object with the given identifier. If the identifier
is being called for the first time, the instance will be created and cached inside the
serviceManager. If `getObject(identifier)` is called again, the cached instance will be returned. `getObject` will
return a Deferred if the object needs to be created, and syncronously if the object is retrieved
from cache.

`createObject(identifier)` will always return a fresh instance of the identifier. This fresh isntance
will always overwrite any existing instance in the serviceManager cache. `createObject` will always
return a Deferred.

`getRef(identifier)` will return a Ref object that can be used to proxy the real isntance. See below for
more detail about Ref objects. `getRef` will always return syncronously.

If there is ever a need to flush the serviceManager cache, it can be done with `clearInstanceCache()`.

Asside from injecting values, a ServiceManager can also inject objects. Eg:

    {
        object1: {
            moduleName: 'MyNamespace/MyClass1'
            values: {
                a: 1,
                b: 'hello'
            },
            createObjects: {
                c: 'object2'
            }
            getObjects: {
                d: 'object3'
            },
            refObjects: {
                e: 'object4'
            }
        },
        object2: {
            moduleName: 'MyNamespace/MyClass2'
        },
        object3: {
            moduleName: 'MyNamespace/MyClass2'
        },
        object4: {
            moduleName: 'MyNamespace/MyClass2'
        },
    }

Calling `getObject('object1])` with the above config will do lots of cool stuff:

    - It will inject values  into properties `a` and `b`
    - It will create an instance of object2 and inject it into property `c`
    - It will check for a cached instnace of object3, and inject it into property `d`
    - It will create a Ref object which points to object4, and inject it into property `e`

Object injections can be nested as deeply as you wish. If you have need of circular dependencies,
then use a Ref object, otherwise the ServiceManager will get stuck in an endless loop.

#Ref Objects

Ref objects hold a reference to an identifier, but are not the actual identifier. Ref objects
allow lazy loading of dependencies. Ref objects have two basic methods `getObject` and `createObject`.
Either of these can be called to return the object that the Ref references.

Ref objects can also be extended to proxy the funtions of the object they reference. This
can be done through the `proxyMethods` config key. This config key must be an array
of method names that exist on the module. For example:

    {
        object1: {
            moduleName: 'MyNamespace/MyClass1'
            refObjects: {
                a: 'object2'
            }
        },
        object2: {
            moduleName: 'MyNamespace/MyClass2'
            proxyMethods: [
                'method1',
                'method2'
            ]
        },
    }

When `getObject('object1')` is called, it will return an instance with property
`a` set with an instance of a Ref object pointing to object2. However, along with
the normal Ref methods of `getObject()` and `createObject()`, the Ref will have two
additional methods, `method1()` and `method2()`. Calling either of these methods
on the Ref object will first load object2, then call the method of the same name
on object2. Any arguments passed to `ref.method1()` will be passed down to
`object2.method1()`. `ref.method1()` will return a Deferred which will resolve
to the return value of `object2.method1()`.

#Injecting Dijits

Rather than suppling a `moduleName` in the config, a `dijitId` may be supplied instead.
Then any dijit created with that id will be injected. For example:

    {
        button1: {
            dijitId: 'button1'
            values: {
                title: 'this is button 1'
            }
        }
    }

If a serviceManager is configured as above, the following call will inject the dijit's
`title` property:

    require(['dijit/form/Button'], function(Button){
        var button = new Button({id: 'button1'});
    })

#AMD Plugins

Several AMD plugins are provided to make working with the ServiceManager simple.
The first gets an instnace of the shared serviceManager. This serviceManager instance
is created the first time the `getServiceManager` plugin is called, and the instance
is cached inside the plugin. The instance will be configured with the `service_manager` key
from the dojo config object. Eg:

    require(['Sds/ServiceManager/Shared/getServiceManager!'], function(serviceManager){
        var myObject = serviceManager.getObject('myObject');
    })

Plugins are also provided for `getObject`, `createObject` and `getRef`. Each of these
plugins takes an identifier that will be fetched from the shared serviceManager. Eg:

    require(['Sds/ServiceManager/Shared/getObject!MyObject'], function(myObject){
        //Do something with myObject
    })

#ServiceManagerAware

If an object created with a serviceManager has a `isServiceManagerAware` property that
evaluates to true, then that object will have its `serviceManager` property injected with
the serviceManager that created it.

For convinience, inheriting from `ServiceManagerAwareMixin` will do this for you.
