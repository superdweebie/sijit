define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    validatorMessages,
    BaseValidator
){
    // module:
    //		Sds/Common/Validator/InequalityValidator

    return declare(
        'Sds/Common/Validator/InequalityValidator',
        [BaseValidator],
        {

            operator: undefined,

            compareValue: undefined,

            constructor: function (operator, compareValue) {
                this.operator = operator;
                this.compareValue = compareValue;
            },

            _isValid: function(value){
                var messages = [];

                var result = true;

                switch (this.operator){
                    case '>':
                        if ( ! (this.compareValue > value)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorLessThanMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case '>=':
                        if ( ! (this.compareValue >= value)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorLessThanOrEqualMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case '<':
                        if ( ! (this.compareValue < value)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorGreaterThanMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case '<=':
                        if ( ! (this.compareValue <= value)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorGreaterThanOrEqualMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case '!=':
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
});
