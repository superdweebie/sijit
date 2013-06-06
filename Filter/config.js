define ([], function (){
    return {
        moduleManager: {
            'FilterFactory': {
                base: 'Sds/Filter/factory',
                gets: {
                    manager: 'Sds/ModuleManager/Shared/getModuleManager!'
                }
            },
            'Sds/Filter/Group': {
                directives: {
                    cache: false
                }
            }
        }
    };
});
