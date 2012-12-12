// This code generated by Sds\DoctrineExtensions\Dojo
define([
    'dojo/_base/declare',
    'Sds/Common/Validator/ValidatorGroup',
    'Sds/Common/Validator/RequiredValidator',
    'Sds/Common/Validator/PersonalNameValidator'
],
function(
    declare,
    ValidatorGroup,
    RequiredValidator,
    PersonalNameValidator
){
    // Will return a validator that can be used to check
    // the firstname field

    return declare(
        'Sds/IdentityModule/DataModel/Identity/Firstname/Validator',
        [ValidatorGroup],
        {
            field: "firstname",

            validators: [
                new RequiredValidator,
                new PersonalNameValidator
            ]
        }
    );
});