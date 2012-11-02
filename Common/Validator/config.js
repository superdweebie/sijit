define ([], function (){
    return {
        moduleManager: {
            'alphaValidator': {base: 'Sds/Common/Validator/AlphaValidator', directives: {cache: false}},
            'credentialValidator': {base: 'Sds/Common/Validator/CredentialValidator', directives: {cache: false}},
            'currencyValidator': {base: 'Sds/Common/Validator/CurrencyValidator', directives: {cache: false}},
            'datatypeValidator': {base: 'Sds/Common/Validator/DatatypeValidator', directives: {cache: false}},
            'emailAddressValidator': {base: 'Sds/Common/Validator/EmailAddressValidator', directives: {cache: false}},
            'identifierArrayValidator': {base: 'Sds/Common/Validator/IdentifierArrayValidator', directives: {cache: false}},
            'identifierValidator': {base: 'Sds/Common/Validator/IdentifierValidator', directives: {cache: false}},
            'indequalityValidator': {base: 'Sds/Common/Validator/InequalityValidator', directives: {cache: false}},
            'lengthValidator': {base: 'Sds/Common/Validator/LengthValidator', directives: {cache: false}},
            'modelValidator': {base: 'Sds/Common/Validator/ModelValidator', directives: {cache: false}},
            'notRequiredValidator': {base: 'Sds/Common/Validator/NotRequiredValidator', directives: {cache: false}},
            'personalNameValidator': {base: 'Sds/Common/Validator/PersonalNameValidator', directives: {cache: false}},
            'requiredValidator': {base: 'Sds/Common/Validator/RequiredValidator', directives: {cache: false}},
            'validatorGroup': {base: 'Sds/Common/Validator/ValidatorGroup', directives: {cache: false}}
        }
    };
});
