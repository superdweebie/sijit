define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    './_MessagesMixin'
],
function (
    declare,
    lang,
    array,
    MessagesMixin
){
    return declare(
        [MessagesMixin],
        {
            // Adds a help messages to form inputs
            //

            // _helpMessageObjects: string,
            //_helpMessageObjects: undefined,

            _setHelpMessagesAttr: function(messages) {

                if (typeof messages == 'string'){
                    messages = [messages];
                }

                this._helpMessageObjects = this.updateMessages(
                    array.map(messages, lang.hitch(this, this.formatHelpMessage)),
                    this._helpMessageObjects
                );
            },

            formatHelpMessage: function(message){
                return '<span class="muted">'+message+'</span>';
            }
        }
    );
});
