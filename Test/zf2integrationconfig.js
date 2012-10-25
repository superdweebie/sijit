// Dojo Configuration
dojoConfig = {
    isDebug: true,
    popup: true,
    async: true,
    mergeConfigs: [
        'Sds/ExceptionModule/config',
        'Sds/Router/config',
        'Sds/Mongo/config',
        'Sds/IdentityModule/config',
        'Sds/AuthenticationModule/config',
        'Sds/Test/config'
    ]
}
