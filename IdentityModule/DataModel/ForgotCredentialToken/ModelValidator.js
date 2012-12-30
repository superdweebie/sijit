// This code generated by Sds\DoctrineExtensions\Dojo
define([
    'dojo/_base/declare',
    'Sds/Validator/ModelValidator',
    'Sds/IdentityModule/DataModel/ForgotCredentialToken/IdentityName/Validator'
],
function(
    declare,
    ModelValidator,
    IdentityNameValidator
){
    // Will return an validator that can be used to validate
    // a complete instance of the document/model

    return declare(
        'Sds/IdentityModule/DataModel/ForgotCredentialToken/ModelValidator',
        [ModelValidator],
        {

            validators: [
                new IdentityNameValidator
            ]
        }
    );
});
