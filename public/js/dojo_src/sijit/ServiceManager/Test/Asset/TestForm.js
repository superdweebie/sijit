define([
    'dojo/_base/declare',
    'dojo/_base/Deferred',
    'sijit/Form/FormInterface'
],
function(
    declare,
    Deferred,
    FormInterface
){

    return declare(
        'sijit.ServiceManager.Test.Asset.TestForm',
        [FormInterface],
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
