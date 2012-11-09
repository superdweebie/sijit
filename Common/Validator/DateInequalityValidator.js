define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/date',
    'dojo/date/locale',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    lang,
    date,
    dateLocale,
    validatorMessages,
    BaseValidator
){
    // module:
    //		Sds/Common/Validator/DateInequalityValidator

    // These are the possible operators that can be tested for
    var operators = {
        LESS_THAN: '>',
        LESS_THAN_EQUAL: '>=',
        GREATER_THAN: '<',
        GREATER_THAN_EQUAL: '<=',
        NOT_EQUAL: '!='
    };

    var InequalityValidator = declare(
        'Sds/Common/Validator/DateInequalityValidator',
        [BaseValidator],
        {

            operator: operators.GREATER_THAN,

            formatLength: 'short',

            compareValue: new Date(),

            portion: 'date',

            _isValid: function(value){
                var messages = [];

                var result = true;

                switch (this.operator){
                    case operators.LESS_THAN:
                        if ( ! (date.compare(this.compareValue, value, this.portion) > 0)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorLessThanMessage,
                                {compareValue: dateLocale.format(this.compareValue, {selector: 'date', formatLength: this.formatLength})}
                            ));
                        }
                        break;
                    case operators.LESS_THAN_EQUAL:
                        if ( ! (date.compare(this.compareValue, value, this.portion) >= 0)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorLessThanOrEqualMessage,
                                {compareValue: dateLocale.format(this.compareValue, {selector: 'date', formatLength: this.formatLength})}
                            ));
                        }
                        break;
                    case operators.GREATER_THAN:
                        if ( ! (date.compare(this.compareValue, value, this.portion) < 0)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorGreaterThanMessage,
                                {compareValue: dateLocale.format(this.compareValue, {selector: 'date', formatLength: this.formatLength})}
                            ));
                        }
                        break;
                    case operators.GREATER_THAN_EQUAL:
                        if ( ! (date.compare(this.compareValue, value, this.portion) <= value)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorGreaterThanOrEqualMessage,
                                {compareValue: dateLocale.format(this.compareValue, {selector: 'date', formatLength: this.formatLength})}
                            ));
                        }
                        break;
                    case operators.NOT_EQUAL:
                        if ( ! (date.compare(this.compareValue, value, this.portion) != 0)){
                            result = false;
                            messages.push(BaseValidator.formatMessage(
                                validatorMessages.inequalityValidatorNotEqualMessage,
                                {compareValue: dateLocale.format(this.compareValue, {selector: 'date', formatLength: this.formatLength})}
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
