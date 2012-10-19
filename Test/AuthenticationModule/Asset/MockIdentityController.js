define([
    'dojo/_base/declare',
    'dojo/dom'
],
function(
    declare,
    dom
){
    return declare(
        'Sds/Test/AuthenticationModule/Asset/MockIdentityController',
        null,
        {
            forgotCredential: function(){
                dom.byId('MockIdentityControllerMessage').innerHTML = 'forgotCredential called';
            },
            register: function(){
                dom.byId('MockIdentityControllerMessage').innerHTML = 'register called';
            }
        }
    );
});
