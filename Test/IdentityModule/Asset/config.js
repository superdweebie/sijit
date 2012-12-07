define(['dojo/store/Memory'], function(Memory){
    return {
        moduleManager: {
            'Sds/IdentityModule/IdentityController': {
                params: {
                    identityStore: new Memory({
                        idProperty: 'identityName',
                        data: [
                            {identityName: 'toby', firstname: 'Toby'}
                        ]
                    })
                }
            },
            'Sds/IdentityModule/View/CreateIdentity': {
                base: 'Sds/Test/IdentityModule/Asset/MockCreateIdentityView'
            }
        }
    }
});


