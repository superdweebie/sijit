define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'Sds/Common/Form/_MessagesMixin'
],
function (
    declare,
    array,
    MessagesMixin
){
    return declare(
        'Sds/Common/Form/_HelpMessagesMixin',
        [MessagesMixin],
        {
            // Adds a help messages to form inputs
            //

            // _helpMessageObjects: string
            _helpMessageObjects: undefined,
                        
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
