define([
    'dojo/_base/declare',
    './_MessagesMixin'
],
function(
    declare,
    MessagesMixin
){
    // module:
    //		Sds/Form/_ValidationMessagesMixin

    return declare
    (
        [MessagesMixin],
        {

            // Adds a validation messages to form inputs
            //

            // _helpMessageObjects: string
            //
            //_validationMessageObjects: undefined,

            _setValidationMessagesAttr: function(messages) {

                if (typeof messages == 'string'){
                    messages = [messages];
                }

                this._validationMessageObjects = this.updateMessages(messages, this._validationMessageObjects);
            }
        }
    );
});
