define([
    'dojo/Store/Memory',
    'Sds/Test/Store/Asset/Simple'
], function(
    Memory,
    Simple
){
    return {
        moduleManager: {
            'Sds/Store/storeManager': {
                gets: {
                    stores: [
                        new Memory({
                            idProperty: 'ref',
                            data: [
                                {ref: 'TN', name: 'Tennessee'},
                                {ref: 'VA', name: 'Virginia'},
                                {ref: 'WA', name: 'Washington'},
                                {ref: 'FL', name: 'Florida'},
                                {ref: 'CA', name: 'California'}
                            ],
                            target: 'TestTarget/',
                            name: 'statesStore',
                            model: Simple
                        })
                    ]
                }
            }
        }
    }
});
