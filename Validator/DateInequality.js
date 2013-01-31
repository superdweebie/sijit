define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/date',
    'dojo/date/locale',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Validator/Base'
],
function(
    declare,
    lang,
    string,
    date,
    dateLocale,
    validatorMessages,
    Base
){
    // module:
    //		Sds/Validator/DateInequality

    // These are the possible operators that can be tested for
    var operators = {
        LESS_THAN: '>',
        LESS_THAN_EQUAL: '>=',
        GREATER_THAN: '<',
        GREATER_THAN_EQUAL: '<=',
        NOT_EQUAL: '!='
    };

    var DateInequality = declare(
        'Sds/Validator/DateInequality',
        [Base],
        {

            operator: operators.GREATER_THAN,

            formatLength: 'short',

            compareValue: new Date(),

            portion: 'date',

            _isValid: function(value){

                var messages = [],
                    result = true;

                switch (this.operator){
                    case operators.LESS_THAN:
                        if ( ! (date.compare(this.compareValue, value, this.portion) > 0)){
                            result = false;
                            messages.push(string.substitute(
                                validatorMessages.inequalityLessThanMessage,
                                {compareValue: dateLocale.format(this.compareValue, {selector: 'date', formatLength: this.formatLength})}
                            ));
                        }
                        break;
                    case operators.LESS_THAN_EQUAL:
                        if ( ! (date.compare(this.compareValue, value, this.portion) >= 0)){
                            result = false;
                            messages.push(string.substitute(
                                validatorMessages.inequalityLessThanOrEqualMessage,
                                {compareValue: dateLocale.format(this.compareValue, {selector: 'date', formatLength: this.formatLength})}
                            ));
                        }
                        break;
                    case operators.GREATER_THAN:
                        if ( ! (date.compare(this.compareValue, value, this.portion) < 0)){
                            result = false;
                            messages.push(string.substitute(
                                validatorMessages.inequalityGreaterThanMessage,
                                {compareValue: dateLocale.format(this.compareValue, {selector: 'date', formatLength: this.formatLength})}
                            ));
                        }
                        break;
                    case operators.GREATER_THAN_EQUAL:
                        if ( ! (date.compare(this.compareValue, value, this.portion) <= 0)){
                            result = false;
                            messages.push(string.substitute(
                                validatorMessages.inequalityGreaterThanOrEqualMessage,
                                {compareValue: dateLocale.format(this.compareValue, {selector: 'date', formatLength: this.formatLength})}
                            ));
                        }
                        break;
                    case operators.NOT_EQUAL:
                        if ( ! (date.compare(this.compareValue, value, this.portion) != 0)){
                            result = false;
                            messages.push(string.substitute(
                                validatorMessages.inequalityNotEqualMessage,
                                {compareValue: dateLocale.format(this.compareValue, {selector: 'date', formatLength: this.formatLength})}
                            ));
                        }
                        break;
                }

                return {result: result, messages: messages};
            }
        }
    );

    lang.mixin(DateInequality, operators);

    return DateInequality;
});
