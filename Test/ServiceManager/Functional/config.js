define([],
function(){
    return {
        serviceManager: {
            'statesStore': {
                moduleName: 'dojo/store/Memory',
                values: {
                    idProperty: 'ref',
                    data: [
                        {ref: 'TN', name: 'Tennessee'},
                        {ref: 'VA', name: 'Virginia'},
                        {ref: 'WA', name: 'Washington'},
                        {ref: 'FL', name: 'Florida'},
                        {ref: 'CA', name: 'California'}
                    ]
                }
            },
            'StatesSelect': {
                moduleName: 'Sds/Common/Form/Select',
                useDeclare: true,
                values: {
                    label: 'state',
                    storeLabelAttr: 'name',
                    query: {name: /^.*i.*$/}
                },
                getObjects: {
                    store: 'statesStore'
                }
            }
        }
    }
});
