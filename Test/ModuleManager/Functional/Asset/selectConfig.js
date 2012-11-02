define([],
function(){
    return {
        moduleManager: {
            'statesStore': {
                base: 'dojo/store/Memory',
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
                base: 'Sds/Common/Form/Select',
                directives: {
                    declare: true,
                    define: true
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
