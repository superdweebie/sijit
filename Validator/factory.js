define([
    'dojo/_base/lang',
    'dojo/_base/array'
],
function(
    lang,
    array
){
    return {

        //manager: undefined,

        abreviations: {
            Alpha: 'Sds/Validator/Alpha',
            Credential: 'Sds/Validator/Credential',
            CreditCardExpiry: 'Sds/Validator/CreditCardExpiry',
            CreditCard: 'Sds/Validator/CreditCard',
            Currency: 'Sds/Validator/Currency',
            Cvv: 'Sds/Validator/Cvv',
            Datatype: 'Sds/Validator/Datatype',
            DateInequality: 'Sds/Validator/DateInequality',
            EmailAddress: 'Sds/Validator/EmailAddress',
            IdentifierArray: 'Sds/Validator/IdentifierArray',
            Identifier: 'Sds/Validator/Identifier',
            Indequality: 'Sds/Validator/Indequality',
            Length: 'Sds/Validator/Length',
            Model: 'Sds/Validator/Model',
            NotRequired: 'Sds/Validator/NotRequired',
            PersonalName: 'Sds/Validator/PersonalName',
            Required: 'Sds/Validator/Required',
            Group: 'Sds/Validator/Group'
        },

        create: function(config){

            switch (true){
                case Boolean(this.abreviations[config]):
                    config = this.abreviations[config];
                    break;
                case lang.isArray(config):
                    config = array.map(config, lang.hitch(this, function(item){
                        if (this.abreviations[item]){
                            return this.abreviations[item];
                        } else {
                            return item;
                        }
                    }));
                    config = {
                        base: 'Sds/Validator/Group',
                        gets: {
                            validators: config
                        }
                    };
                    break;
            }

            return this.manager.get(config);
        }
    }
});
