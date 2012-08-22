define([
    'dojo/_base/declare',
    'dojo/dom'
],
function(
    declare,
    dom
){
    return declare(
        'Sds.Test.AuthModule.Asset.MockUserController',
        null,
        {
            recoverPassword: function(){
                dom.byId('MockUserControllerMessage').innerHTML = 'recoverPassword called';
            },
            register: function(){
                dom.byId('MockUserControllerMessage').innerHTML = 'register called';
            }
        }
    );
});


