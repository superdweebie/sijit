define ([], function (){
    return {
        moduleManager: {
            'ValidatorFactory': {
                base: 'Sds/Validator/validatorFactory',
                gets: {
                    validatorManager: 'Sds/ModuleManager/Shared/getModuleManager!'
                }
            },
            'AlphaValidator': {base: 'Sds/Validator/AlphaValidator', directives: {cache: false}},
            'CredentialValidator': {base: 'Sds/Validator/CredentialValidator', directives: {cache: false}},
            'CreditCardExpiryValidator': {base: 'Sds/Validator/CreditCardExpiryValidator', directives: {cache: false}},            
            'CreditCardValidator': {base: 'Sds/Validator/CreditCardValidator', directives: {cache: false}},
            'CurrencyValidator': {base: 'Sds/Validator/CurrencyValidator', directives: {cache: false}},
            'CvvValidator': {base: 'Sds/Validator/CvvValidator', directives: {cache: false}},
            'DatatypeValidator': {base: 'Sds/Validator/DatatypeValidator', directives: {cache: false}},
            'DateInequalityValidator': {base: 'Sds/Validator/DateInequalityValidator', directives: {cache: false}},
            'EmailAddressValidator': {base: 'Sds/Validator/EmailAddressValidator', directives: {cache: false}},
            'IdentifierArrayValidator': {base: 'Sds/Validator/IdentifierArrayValidator', directives: {cache: false}},
            'IdentifierValidator': {base: 'Sds/Validator/IdentifierValidator', directives: {cache: false}},
            'IndequalityValidator': {base: 'Sds/Validator/InequalityValidator', directives: {cache: false}},
            'LengthValidator': {base: 'Sds/Validator/LengthValidator', directives: {cache: false}},
            'ModelValidator': {base: 'Sds/Validator/ModelValidator', directives: {cache: false}},
            'NotRequiredValidator': {base: 'Sds/Validator/NotRequiredValidator', directives: {cache: false}},
            'PersonalNameValidator': {base: 'Sds/Validator/PersonalNameValidator', directives: {cache: false}},
            'RequiredValidator': {base: 'Sds/Validator/RequiredValidator', directives: {cache: false}},
            'ValidatorGroup': {base: 'Sds/Validator/ValidatorGroup', directives: {cache: false}}
        }
    };
});
