define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'Sds/View/BaseView'
],
function(
    declare,
    Deferred,
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
                var r = new Deferred;
                r.resolve({
                    state: this.state,
                    value: this.value
                });
                
                return r;
            },
            reset: function(){
            }
        }
    );
});


