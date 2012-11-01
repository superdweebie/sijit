define(
    [],
    function(){
        return {
            serviceManager: {
                'zoo': {
                    moduleName: 'Sds/Test/ServiceManager/Asset/Zoo',
                    values: {
                        name: 'shared zoo'
                    },
                    getObjects: {
                        lion: 'Sds/Test/ServiceManager/Asset/Lion'
                    }
                }
            }
        }
    }
);

