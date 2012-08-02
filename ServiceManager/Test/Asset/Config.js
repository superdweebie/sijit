define(
    [],
    function(){
        return {
            serviceManager: {
                'zoo': {
                    moduleName: 'sijit/ServiceManager/Test/Asset/Zoo',
                    values: {
                        name: 'shared zoo'
                    },
                    getObjects: {
                        lion: 'sijit/ServiceManager/Test/Asset/Lion'
                    }
                }
            }
        }
    }
);

