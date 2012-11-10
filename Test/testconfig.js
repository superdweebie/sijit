// Dojo Configuration
dojoConfig = {
    isDebug: true,
    locale: 'en-au',
    popup: true,
    async: true,
    aliases: [
        ['get', 'Sds/ModuleManager/Shared/get'],
        ['proxy', 'Sds/ModuleManager/Shared/proxy'],
    ],
    mergeConfigs: [
        'Sds/Common/Validator/config',
        'Sds/ExceptionModule/config',
        'Sds/Router/config',
        'Sds/Mongo/config',
        'Sds/IdentityModule/config',
        'Sds/AuthenticationModule/config',
        'Sds/Test/config'
    ]
}
