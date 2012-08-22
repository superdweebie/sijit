define([
    'dojo/_base/declare',
    'dojo/_base/Deferred',
    'Sds/InputAgent/BaseInputAgent'
],
function(
    declare,
    Deferred,
    BaseInputAgent
){

    return declare(
        'Sds.Test.ServiceManager.Asset.TestInputAgent',
        [BaseInputAgent],
        {
            value: {test: 'good'},

            activate: function(){
                var result = new Deferred();
                result.resolve();
                return result;
            }
        }
    );
});
