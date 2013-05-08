define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    '../array',
    'dojo/dom-class',
    'dojo/dom-construct'
],
function (
    declare,
    lang,
    array,
    domClass,
    domConstruct
){
    return declare(
        [],
        {
            // Adds as messages to form inputs
            //

            // messagePosition: string
            //      Possible values are:
            //      auto: if the message is one line, display inline. If it is multiline, display block
            //      inline: always display message inline. If the message is more than one line, only the first will be shown.
            //      block: always display message as block, even when there is only one line.
            messagePosition: 'auto',

            // messageObjects: array
            messageObjects: [],

            //messagesNode: undefined,

            maxMessageId: 0,

            updateMessages: function(messagesToAdd, messageObjectsToRemove){

                this.messageObjects = array.subtract(this.messageObjects, messageObjectsToRemove);

                if ( typeof messagesToAdd == 'string'){
                    messagesToAdd = [messagesToAdd];
                }

                //filter out any blanks
                messagesToAdd = array.filter(messagesToAdd, function(item){
                    if (item == null || item == undefined) {
                        return false
                    }
                    return true;
                });

                var messageObjects;
                if ( ! messagesToAdd || messagesToAdd.length == 0){
                    messageObjects =  [];
                } else {
                    //create the message node if it doesn't already exist'
                    if ( ! this.messagesNode){
                        this.messagesNode = domConstruct.create(
                            'span',
                            {},
                            this.focusNode ? this.focusNode.parentNode : this.domNode,
                            'last'
                        )
                    }

                    messageObjects = array.map(messagesToAdd, lang.hitch(this, function(message){
                        ++this.maxMessageId;
                        return {id: this.maxMessageId, message: message};
                    }));

                    this.messageObjects = messageObjects.concat(this.messageObjects);
                }

                this._renderMessages();
                this.emit('messages-updated', {objects: this.messageObjects, node: this.messagesNode});
                return messageObjects;
            },

            _renderMessages: function(){

                if ( ! this.messagesNode){
                    return;
                }

                switch (true){
                    case (this.messagePosition == 'auto' && this.messageObjects.length > 1) || this.messagePosition == 'block':
                        domClass.remove(this.messagesNode, 'help-inline hide');
                        domClass.add(this.messagesNode, 'help-block');
                        this.messagesNode.innerHTML = array.map(this.messageObjects, function(messageObject){
                            return '<small>' + messageObject.message + '</small>';
                        }).join('<br />');
                        break;
                    case (this.messagePosition == 'inline' && this.messageObjects.length > 1) || this.messageObjects.length == 1:
                        domClass.remove(this.messagesNode, 'help-block hide');
                        domClass.add(this.messagesNode, 'help-inline');
                        this.messagesNode.innerHTML = '<small>' + this.messageObjects[0].message + '</small>';
                        break;
                    default:
                        domClass.add(this.messagesNode, 'hide');
                }
            }
        }
    );
});
