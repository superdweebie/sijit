define([
    'dojo/_base/declare',
    'dojo/_base/array',
    './_MessagesMixin'
],
function (
    declare,
    array,
    MessagesMixin
){
    return declare(
        [MessagesMixin],
        {
            // Adds a help messages to form inputs
            //

            // _helpMessageObjects: string
            //_helpMessageObjects: undefined,

            _setHelpMessagesAttr: function(messages) {

                if (typeof messages == 'string'){
                    messages = [messages];
                }

                messages = array.map(messages, function(message){
                    return '<span class="muted">'+message+'</span>'
                });
                this._helpMessageObjects = this.updateMessages(messages, this._helpMessageObjects);
            }
        }
    );
});
