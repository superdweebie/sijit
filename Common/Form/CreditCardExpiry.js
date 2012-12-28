define([
    'dojo/_base/declare',
    'Sds/Common/Form/ValidationControlGroup',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Validator/CreditCardExpiryValidator',    
    'dojo/text!./Template/CreditCardExpiry.html',
    'Sds/Common/Form/Select'
],
function (
    declare,
    ValidationControlGroup,
    WidgetsInTemplateMixin,
    CreditCardExpiryValidator,
    template
){
    return declare(
        'Sds/Common/Form/CreditCardExpiry',
        [ValidationControlGroup, WidgetsInTemplateMixin],
        {
            templateString: template,
            
            validator: new CreditCardExpiryValidator
        }
    );
});
