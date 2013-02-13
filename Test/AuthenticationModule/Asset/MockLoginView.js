define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'Sds/Mvc/BaseView'
],
function(
    declare,
    Deferred,
    BaseView
){
    return declare(
        [BaseView],
        {
            state: '',

            enableRememberMe: true,

            value: {
                identityName: undefined,
                credential: undefined
            },
            activate: function(){
                var r = new Deferred;

                if (this.enableRememberMe){
                    r.resolve({
                        state: this.state,
                        value: this.value,
                        rememberMe: ['on']
                    });
                } else {
                    r.resolve({
                        state: this.state,
                        value: this.value
                    });
                }

                return r;
            }
        }
    );
});
