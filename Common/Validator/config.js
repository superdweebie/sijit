define ([], function (){
    return {
        moduleManager: {

            'ValidatorFactory': {
                base: 'Sds/Common/Validator/validatorFactory',
                gets: {
                    validatorManager: 'Sds/ModuleManager/Shared/getModuleManager!'
                }
            },
            'AlphaValidator': {base: 'Sds/Common/Validator/AlphaValidator', directives: {cache: false}},
            'CredentialValidator': {base: 'Sds/Common/Validator/CredentialValidator', directives: {cache: false}},
            'CurrencyValidator': {base: 'Sds/Common/Validator/CurrencyValidator', directives: {cache: false}},
            'DatatypeValidator': {base: 'Sds/Common/Validator/DatatypeValidator', directives: {cache: false}},
            'DateInequalityValidator': {base: 'Sds/Common/Validator/DateInequalityValidator', directives: {cache: false}},
            'EmailAddressValidator': {base: 'Sds/Common/Validator/EmailAddressValidator', directives: {cache: false}},
            'IdentifierArrayValidator': {base: 'Sds/Common/Validator/IdentifierArrayValidator', directives: {cache: false}},
            'IdentifierValidator': {base: 'Sds/Common/Validator/IdentifierValidator', directives: {cache: false}},
            'IndequalityValidator': {base: 'Sds/Common/Validator/InequalityValidator', directives: {cache: false}},
            'LengthValidator': {base: 'Sds/Common/Validator/LengthValidator', directives: {cache: false}},
            'ModelValidator': {base: 'Sds/Common/Validator/ModelValidator', directives: {cache: false}},
            'NotRequiredValidator': {base: 'Sds/Common/Validator/NotRequiredValidator', directives: {cache: false}},
            'PersonalNameValidator': {base: 'Sds/Common/Validator/PersonalNameValidator', directives: {cache: false}},
            'RequiredValidator': {base: 'Sds/Common/Validator/RequiredValidator', directives: {cache: false}},
            'ValidatorGroup': {base: 'Sds/Common/Validator/ValidatorGroup', directives: {cache: false}}
        }
    };
});
