define([
    'dojo/_base/declare',
    'Sds/View/BaseView'
],
function(
    declare,
    BaseView
){
    return declare(
        'Sds.Test.AuthModule.Test.Asset.MockLoginView',
        [BaseView],
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


