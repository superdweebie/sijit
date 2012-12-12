define([
    'dojo/Store/Memory'
], function(
    Memory
){
    return {
        moduleManager: {
            'Sds/Store/storeManager': {
                params: {
                    stores: [
                        new Memory({
                            idProperty: 'name',
                            data: [
                                {name: 'lucy'}
                            ],
                            target: 'Simple/'
                        })
                    ]
                }
            }
        }
    }
});
