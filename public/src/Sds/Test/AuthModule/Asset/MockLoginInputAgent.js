define([
    'dojo/_base/declare',
    'Sds/InputAgent/BaseInputAgent'
],
function(
    declare,
    BaseInputAgent
){
    return declare(
        'Sds.Test.AuthModule.Test.Asset.MockLoginInputAgent',
        [BaseInputAgent],
        {
            state: '',
            value: {
                username: undefined,
                password: undefined
            },
            activate: function(){
                return {
                    state: this.state,
                    value: this.value
                };
            },
            reset: function(){
            }
        }
    );
});


