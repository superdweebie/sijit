var profile = {
    "basePath":"../../../../../",
    "releaseDir":"public/dojo_rel",
    "action":"release",
    "cssOptimize":"comments",
    "layerOptimize":"closure",
    "stripConsole":"all",
    "selectorEngine":"acme",
    "mini":0,
    locale: 'en-au',
    defaultConfig: {
        hasCache:{
            "dojo-built": 1,
            "dojo-loader": 1,
            "dom": 1,
            "host-browser": 1,
            "config-selectorEngine": "acme"
        },
        popup: true,
        async: true,
        mergeConfigs: [
            'Sds/Validator/config',
            'Sds/Filter/config',
            'Sds/ExceptionModule/config',
            'Sds/Router/config',
            'Sds/Store/config',
            'Sds/Mongo/config',
            'Sds/IdentityModule/config',
            'Sds/AuthenticationModule/config',
            'Sds/Test/config'
        ]
    },
    timestampLayers: false,
    "packages":[
    {
        "name":"dojo",
        "location":"vendor/dojo/dojo"
    },
    {
        "name":"dijit",
        "location":"vendor/dojo/dijit"
    },
    {
        "name":"dojox",
        "location":"vendor/dojo/dojox"
    },
    {
        "name":"Sds",
        "location":"vendor/dojo/Sds"
    },
    {
        "name":"bootstrap",
        "location":"vendor/dojo/bootstrap"
    }
    ],
    "layers":{
        "dojo/dojo":{
            "custombase":true,
            "boot":true
        }
    }
}
