define ([], function (){
    return {
        moduleManager: {
            'ValidatorFactory': {
                base: 'Sds/Validator/factory',
                gets: {
                    manager: 'Sds/ModuleManager/Shared/getModuleManager!'
                }
            },
            'Alpha': {base: 'Sds/Validator/Alpha', directives: {cache: false}},
            'Credential': {base: 'Sds/Validator/Credential', directives: {cache: false}},
            'CreditCardExpiry': {base: 'Sds/Validator/CreditCardExpiry', directives: {cache: false}},
            'CreditCard': {base: 'Sds/Validator/CreditCard', directives: {cache: false}},
            'Currency': {base: 'Sds/Validator/Currency', directives: {cache: false}},
            'Cvv': {base: 'Sds/Validator/Cvv', directives: {cache: false}},
            'Datatype': {base: 'Sds/Validator/Datatype', directives: {cache: false}},
            'DateInequality': {base: 'Sds/Validator/DateInequality', directives: {cache: false}},
            'EmailAddress': {base: 'Sds/Validator/EmailAddress', directives: {cache: false}},
            'IdentifierArray': {base: 'Sds/Validator/IdentifierArray', directives: {cache: false}},
            'Identifier': {base: 'Sds/Validator/Identifier', directives: {cache: false}},
            'Indequality': {base: 'Sds/Validator/Inequality', directives: {cache: false}},
            'Length': {base: 'Sds/Validator/Length', directives: {cache: false}},
            'Model': {base: 'Sds/Validator/Model', directives: {cache: false}},
            'NotRequired': {base: 'Sds/Validator/NotRequired', directives: {cache: false}},
            'PersonalName': {base: 'Sds/Validator/PersonalName', directives: {cache: false}},
            'Required': {base: 'Sds/Validator/Required', directives: {cache: false}},
            'Group': {base: 'Sds/Validator/Group', directives: {cache: false}}
        }
    };
});
