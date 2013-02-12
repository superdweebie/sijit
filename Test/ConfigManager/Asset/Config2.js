define(
    [],
    function(){
        return {
            mergeConfigs: [
                'Sds/Test/ConfigManager/Asset/Config3'
            ],
            configTest: {
                test1: {
                    params: {
                        value2: 22
                    }
                },
                test2: {
                    base: 'Test2',
                    params: {
                        value1: 1
                    }
                }
            }
        }
    }
);


