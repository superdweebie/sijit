define([
    'dojo/_base/declare',
    './ValidationControlGroup',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Validator/CreditCardExpiry',
    'dojo/text!./Template/CreditCardExpiry.html',
    './Select'
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

            validator: new CreditCardExpiryValidator,

            postCreate: function(){

                var i = new Date().getUTCFullYear(),
                    limit = i + 10,
                    years = {},
                    months = {};

                //Create years - 10 years from now
                for (i; i < limit; i++){
                    years[i] = ('' + i).substr(2,2);
                }
                this.year.set('options', years);

                //Create months
                for (i = 1; i < 13; i++){
                    months[i] = i < 10 ? '0' + i : '' + i;
                }
                this.month.set('options', months);

                this.inherited(arguments);
            }
        }
    );
});
