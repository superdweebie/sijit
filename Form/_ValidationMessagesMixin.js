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
                this.watch('postActivity', lang.hitch(this, '_postActivityWatcher'));
                this.watch('_activeSuppressValidationMessages', lang.hitch(this, '_activeSuppressValidationMessagesWatcher'));
            },

            _postActivityWatcher: function(property, oldValue, newValue){
                if (newValue){
                    this.set('_activeSuppressValidationMessages', this.suppressValidationMessages.postActivity);
                } else {
                    this.set('_activeSuppressValidationMessages', this.suppressValidationMessages.preActivity);
                }
            },

            _activeSuppressValidationMessagesWatcher: function(property, oldValue, newValue){
                this.set('validationMessages', this._validationMessages); //trigger a messages re-render
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
                if (this._activeSuppressValidationMessages){
                    return null;
                } else {
                    return message;
                }
            },

            _setSuppressValidationMessagesAttr: function(value){
                if (typeof value != 'object'){
                    value = {
                        preActivity: !!value,
                        postActivity: !!value
                    }
                }

                this._set('suppressValidationMessages', value);

                if (this.postActivity){
                    this.set('_activeSuppressValidationMessages', value.postActivity);
                } else {
                    this.set('_activeSuppressValidationMessages', value.preActivity);
                }
            }
        }
    );
});
