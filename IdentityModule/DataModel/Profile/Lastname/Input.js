// This code generated by Sds\DoctrineExtensions\Dojo
define([
    'dojo/_base/declare',    
    'Sds/Form/ValidationTextBox',
    'Sds/IdentityModule/DataModel/Profile/Lastname/Validator'
],
function(
    declare,    
    ValidationTextBox,
    LastnameValidator
){
    // Will return an input for the lastname field

    return declare(
        'Sds/IdentityModule/DataModel/Profile/Lastname/Input',
        [            
            ValidationTextBox        
        ],
        {
            validator: new LastnameValidator,
            
            name: 'lastname',
            
            label: 'Lastname'
        }
    );
});
