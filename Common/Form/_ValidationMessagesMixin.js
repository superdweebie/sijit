define([
    'dojo/_base/declare',
    'Sds/Common/Form/_MessagesMixin'
],
function(
    declare,
    MessagesMixin
){
    // module:
    //		Sds/Common/Form/_ValidationMessagesMixin

    return declare
    (
        'Sds/Common/Form/_ValidationMessagesMixin',
        [MessagesMixin],
        {
            
            // Adds a validation messages to form inputs
            //

            // _helpMessageObjects: string
            _validationMessageObjects: undefined,
                        
            _setValidationMessagesAttr: function(messages) {
                                
                if (typeof messages == 'string'){
                    messages = [messages];
                }
                                
                this._validationMessageObjects = this.updateMessages(messages, this._validationMessageObjects);
            }                                
        }
    );
});
