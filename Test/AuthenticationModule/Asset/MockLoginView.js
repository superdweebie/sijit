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
        'Sds/Test/AuthenticationModule/Test/Asset/MockLoginView',
        [BaseView],
        {
            state: '',
            value: {
                identityName: undefined,
                credential: undefined
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


