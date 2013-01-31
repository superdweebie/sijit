define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Validator/Base'
],
function(
    declare,
    lang,
    string,
    validatorMessages,
    Base
){
    // module:
    //		Sds/Validator/Inequality

    // These are the possible operators that can be tested for
    var operators = {
        LESS_THAN: '>',
        LESS_THAN_EQUAL: '>=',
        GREATER_THAN: '<',
        GREATER_THAN_EQUAL: '<=',
        NOT_EQUAL: '!='
    };

    var Inequality = declare(
        'Sds/Validator/Inequality',
        [Base],
        {

            operator: operators.GREATER_THAN,

            compareValue: 0,

            _isValid: function(value){

                var messages = [],
                    result = true;

                switch (this.operator){
                    case operators.LESS_THAN:
                        if ( ! (this.compareValue > value)){
                            result = false;
                            messages.push(string.substitute(
                                validatorMessages.inequalityLessThanMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case operators.LESS_THAN_EQUAL:
                        if ( ! (this.compareValue >= value)){
                            result = false;
                            messages.push(string.substitute(
                                validatorMessages.inequalityLessThanOrEqualMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case operators.GREATER_THAN:
                        if ( ! (this.compareValue < value)){
                            result = false;
                            messages.push(string.substitute(
                                validatorMessages.inequalityGreaterThanMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case operators.GREATER_THAN_EQUAL:
                        if ( ! (this.compareValue <= value)){
                            result = false;
                            messages.push(string.substitute(
                                validatorMessages.inequalityGreaterThanOrEqualMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                    case operators.NOT_EQUAL:
                        if ( ! (this.compareValue != value)){
                            result = false;
                            messages.push(string.substitute(
                                validatorMessages.inequalityNotEqualMessage,
                                {compareValue: this.compareValue}
                            ));
                        }
                        break;
                }

                return {result: result, messages: messages};
            }
        }
    );

    lang.mixin(Inequality, operators);

    return Inequality;
});
