define([
    'dojo/_base/declare',
    'Sds/Form/ValidationControlGroup',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Validator/CreditCardExpiryValidator',
    'dojo/text!./Template/CreditCardExpiry.html',
    'Sds/Form/Select'
],
function (
    declare,
    ValidationControlGroup,
    WidgetsInTemplateMixin,
    CreditCardExpiryValidator,
    template
){
    return declare(
        'Sds/Form/CreditCardExpiry',
        [ValidationControlGroup, WidgetsInTemplateMixin],
        {
            templateString: template,

            validator: new CreditCardExpiryValidator
        }
    );
});
