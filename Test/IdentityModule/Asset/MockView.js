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
        'Sds/Test/IdentityModule/Test/Asset/MockView',
        [BaseView],
        {

            //state: undefined,

            //value: undefined,

            activate: function(){
                var r = new Deferred;

                r.resolve({
                    state: this.state,
                    value: this.value
                });

                return r;
            }
        }
    );
});