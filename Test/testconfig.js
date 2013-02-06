var dojo_rel_dir = 'dojo_rel';

// Dojo Configuration for testing
if (window.location.href.indexOf(dojo_rel_dir) == -1){
    //testing with dojo source
    //define the config fully
    dojoConfig = {
        isDebug: true,
        locale: 'en-au',
        popup: true,
        async: true,
        aliases: [
            ['get', 'Sds/ModuleManager/Shared/get'],
            ['proxy', 'Sds/ModuleManager/Shared/proxy']
        ],
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
    }
} else {
    //testing with built dojo
    //most of the config should have been built into dojo.js
    dojoConfig = {
        isDebug: true,
        mergeConfigs: [
            'Sds/Test/config'
        ]
    }
}