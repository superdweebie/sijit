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

            // Should validation messages be suppressed or not?
            suppressValidationMessages: {
                preActivity: true //,
                //postActivity: false
            },

            // Indicates if message suppression is active or not.
            //_activeSuppressValidationMessages: boolean,

            // This is an array of message objects that are displayed
            //_validationMessageObjects: undefined,

            // This is an array of message object that have been set from the
            // ValidationMixin. They may or may not be displayed, depending on the value of
            // suppressValidationMessages and postActivity
            //_validationMessages: [],

            startup: function(){
                this.inherited(arguments);

                //Set watchers
                this.watch('postActivity', lang.hitch(this, '_updateValidationMessages'));
            },

            _updateValidationMessages: function(){
                this.set('validationMessages', this._messages); //trigger rerender
            },

            _setValidationMessagesAttr: function(messages) {
                if (typeof messages == 'string'){
                    messages = [messages];
                }

                this._messages = messages;

                this._validationMessageObjects = this.updateMessages(
                    array.map(messages, lang.hitch(this, this.formatValidationMessage)),
                    this._validationMessageObjects
                );
            },

            formatValidationMessage: function(message){
                if ((this.postActivity && this.suppressValidationMessages.postActivity) ||
                    (!this.postActivity && this.suppressValidationMessages.preActivity)
                ){
                    return null;
                }
                return message;
            },

            _setSuppressValidationMessagesAttr: function(value){
                if (typeof value != 'object'){
                    value = {
                        preActivity: !!value,
                        postActivity: !!value
                    }
                }
                this._set('suppressValidationMessages', value);
                this._updateValidationMessages();
            }
        }
    );
});
