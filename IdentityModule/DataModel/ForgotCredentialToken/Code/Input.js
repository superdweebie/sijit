// This code generated by Sds\DoctrineExtensions\Dojo
define([
    'dojo/_base/declare',
    'Sds/Common/Form/TextBox'
],
function(
    declare,
    TextBox
){
    // Will return an Input for the code field

    return declare(
        'Sds/IdentityModule/DataModel/ForgotCredentialToken/Code/Input',
        [TextBox],
        {
            name: "code",

            label: "Code:",

            type: "hidden"
        }
    );
});