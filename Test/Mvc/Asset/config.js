define([
    'dojo/Store/Memory'
], function(
    Memory
){
    return {
        moduleManager: {
            'Sds/Store/storeManager': {
                gets: {
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
