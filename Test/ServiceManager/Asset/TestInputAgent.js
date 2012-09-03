define([
    'dojo/_base/declare',
    'Sds/View/BaseView'
],
function(
    declare,
    BaseView
){

    return declare(
        'Sds.Test.ServiceManager.Asset.TestView',
        [BaseView],
        {
            value: 'working',

            activate: function(value){
                return value;
            }
        }
    );
});
