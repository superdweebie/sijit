define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    lang,
    validatorMessages,
    BaseValidator
){
    // module:
    //		Sds/Common/Validator/InequalityValidator

    // These are the possible operators that can be tested for
    var operators = {
        LESS_THAN: '>',
        LESS_THAN_EQUAL: '>=',
        GREATER_THAN: '<',
        GREATER_THAN_EQUAL: '<=',
        NOT_EQUAL: '!='
    };

    var InequalityValidator = declare(
        'Sds/Common/Validator/InequalityValidator',
        [BaseValidator],
        {

            operator: operators.GREATER_THAN,

            compareValue: 0,

            _isValid: function(value){
                var messages = [];

                var result = true;

                switch (this.operator){
                    case operators.LESS_THAN:
                        if ( ! (this.compareValue > value)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorLessThanMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case operators.LESS_THAN_EQUAL:
                        if ( ! (this.compareValue >= value)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorLessThanOrEqualMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case operators.GREATER_THAN:
                        if ( ! (this.compareValue < value)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorGreaterThanMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case operators.GREATER_THAN_EQUAL:
                        if ( ! (this.compareValue <= value)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorGreaterThanOrEqualMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case operators.NOT_EQUAL:
                        if ( ! (this.compareValue != value)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorNotEqualMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                }

                return {result: result, messages: messages};
            }
        }
    );

    lang.mixin(InequalityValidator, operators);

    return InequalityValidator;
});
