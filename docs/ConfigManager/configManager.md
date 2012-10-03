configManager
=============

configManager allows dojo config to be composed of multiple config modules.

#configManager and configReady

The config modules you want to merge should be defined in the `mergeConfigs:` key
of dojo config. For example:

    <script
        type="text/javascript"
        src="dojo/dojo.js"
        data-dojo-config="
            isDebug: true,
            popup: true,
            async: true,
            mergeConfigs: [
                'MyNamespace/Config1',
                'MyNamespace/Config2'
            ]
        ">
    </script>

The config modules can be loaded and merged using the `merge` function of the
configManager.

    require(['Sds/ConfigManager/configManager'], function(configManager){
        configManager.merge();
    }

The `merge()` function will return a Deferred object which will resolve when the
config merge is complete.

Alternatively, config modules can be merged using the configReady AMD plugin. The plugin
will not return until configs are merged.

    require(['Sds/ConfigManager/configReady!'], function(){
        //Do something
    }

Config modules are merged in the order given in the `mergeConfigs` key. For example:

If dojo config is defined as:

    <script
        type="text/javascript"
        src="dojo/dojo.js"
        data-dojo-config="
            isDebug: true,
            popup: true,
            async: true,
            mergeConfigs: [
                'MyNamespace/Config1',
                'MyNamespace/Config2'
            ],
            myConfig: {
                c: 500
            }
        ">
    </script>

And, `MyNamespace/Config1` is defined as:

    define(
        [],
        function(){
            return {
                myConfig: {
                    test1: {
                        a: 1,
                        b: 2
                    }
                }
            }
        }
    );

And, `MyNamespace/Config2 is defined as:

    define(
        [],
        function(){
            return {
                myConfig: {
                    test1: {
                        a: 100,
                        c: 3
                    }
                }
            }
        }
    );

The resulting dojo config object would as below. Note that `myConfig` has more
properties, and those properties may have been overwritten.

    {
        isDebug: true,
        popup: true,
        async: true,
        mergeConfigs: [
            'MyNamespace/Config1',
            'MyNamespace/Config2'
        ],
        myConfig: {
            a: 100,
            b: 2,
            c: 500
        }

Some dojo values, such as `async: true` are used by the AMD loader, so cannot be
overridden by a merged config object.

#Dojo Builds

A dojo build system plugin resolver is provided for `configReady!` so that configs can easily be
included when build a layer. To use the plugin, first populate the `mergeConfigs`
array in your dojo build profile. Then include the following in your root
build profile:

    plugins:{
        "Sds/ConfigManager/configReady":"Sds/Build/plugin/configReady"
    }
