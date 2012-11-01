define([],
function(){
    return {
        moduleManager: {
            'statesStore': {
                mid: 'dojo/store/Memory',
                params: {
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
                mid: 'Sds/Common/Form/Select',
                directives: {
                    declare: true
                },
                params: {
                    label: 'state',
                    storeLabelAttr: 'name',
                    query: {name: /^.*i.*$/}
                },
                gets: {
                    store: 'statesStore'
                }
            }
        }
    }
});
