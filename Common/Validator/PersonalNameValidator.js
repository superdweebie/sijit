define([
    'dojo/_base/declare',
    'Sds/Common/Validator/ValidatorGroup',
    'Sds/Common/Validator/LengthValidator',
    'Sds/Common/Validator/AlphaValidator'
],
function(
    declare,
    ValidatorGroup,
    LengthValidator,
    AlphaValidator
){
    return declare(
        'Sds/Common/Validator/PersonalNameValidator',
        [ValidatorGroup],
        {
            constructor: function(){
                this.validators = [
                    new LengthValidator({min: 1, max: 50}),
                    new AlphaValidator()
                ]
            }
        }
    );
});
