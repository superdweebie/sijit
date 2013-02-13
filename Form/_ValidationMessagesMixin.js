define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    './_MessagesMixin'
],
function(
    declare,
    lang,
    array,
    MessagesMixin
){
    // module:
    //		Sds/Form/_ValidationMessagesMixin

    return declare
    (
        [MessagesMixin],
        {

            // Adds a validation messages to form inputs

            suppressValidationMessages: {
                preActivity: true //,
                //postActivity: false
            },

            // _validationMessageObjects: string
            //_validationMessageObjects: undefined,

            _setValidationMessagesAttr: function(messages) {

                if (typeof messages == 'string'){
                    messages = [messages];
                }

                this._validationMessageObjects = this.updateMessages(
                    array.map(messages, lang.hitch(this, this.formatValidationMessage)),
                    this._validationMessageObjects
                );
            },

            formatValidationMessage: function(message){
                var suppress = typeof this.suppressValidationMessages == 'object' ?
                    this.postActivity ?
                        this.suppressValidationMessages.postActivity :
                        this.suppressValidationMessages.preActivity
                    :this.suppressValidationMessages;

                return suppress ? null : message;
            },

            _setSuppressValidationMessagesAttr: function(value){
                this.suppressValidationMessages = value;
                if (this._started && this.validator){
                    this.set('lastValue', this.lastValue);
                }
            }
        }
    );
});
