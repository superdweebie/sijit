define([
    'dojo/_base/declare',
    'Sds/InputAgent/BaseInputAgent'
],
function(
    declare,
    BaseInputAgent
){

    return declare(
        'Sds.Test.ServiceManager.Asset.TestInputAgent',
        [BaseInputAgent],
        {
            value: 'working',

            activate: function(value){
                return value;
            }
        }
    );
});
