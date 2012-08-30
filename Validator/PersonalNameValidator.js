define([
    'dojo/_base/declare',
    'Sds/Validator/ValidatorGroup',
    'Sds/Validator/LengthValidator',
    'Sds/Validator/AlphaValidator'
],
function(
    declare,
    ValidatorGroup,
    LengthValidator,
    AlphaValidator
){
    return declare(
        'Sds/Validator/PersonalNameValidator',
        [ValidatorGroup],
        {
            constructor: function(){
                this.validators = [
                    new LengthValidator(1, 50),
                    new AlphaValidator()
                ]
            }
        }
    );
});
