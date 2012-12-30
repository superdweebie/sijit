define([
    'dojo/_base/declare',
    'Sds/Validator/ValidatorGroup',
    'Sds/Validator/LengthValidator',
    'Sds/Validator/IdentifierCharsValidator'
],
function(
    declare,
    ValidatorGroup,
    LengthValidator,
    IdentifierCharsValidator
){
    return declare(
        'Sds/Validator/IdentifierValidator',
        [ValidatorGroup],
        {
            constructor: function(){
                this.validators = [
                    new LengthValidator({min: 1, max: 50}),
                    new IdentifierCharsValidator()
                ]
            }
        }
    );
});

