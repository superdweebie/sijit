// Dojo Configuration
dojoConfig = {
    isDebug: true,
    popup: true,
    async: true,
    mergeConfigs: [
        'Sds/ExceptionModule/Config',
        'Sds/Mongo/Config',
        'Sds/IdentityModule/Config',
        'Sds/AuthenticationModule/Config'
    ]
}
