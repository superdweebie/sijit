define ([], function (){
    return {
        moduleManager: {
            'ValidatorFactory': {
                base: 'Sds/Validator/factory',
                gets: {
                    manager: 'Sds/ModuleManager/Shared/getModuleManager!'
                }
            }
        }
    };
});
