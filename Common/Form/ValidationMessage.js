define([
    'dojo/_base/declare',
    'dojo/dom-class',    
    'dijit/_Widget'
],
function(
    declare,
    domClass,
    Widget
){
    // module:
    //		Sds/Common/Form/BaseValidationMessage

    return declare
    (
        'Sds/Common/Form/ValidationMessage',
        [Widget],
        {
            // summary:
            //		Displays a message from a validator. Normally automated by _ValidationMixin
                      
            // messagePosition: string
            //      Possible values are:
            //      auto: if the message is one line, display inline. If it is multiline, display block
            //      inline: always display message inline. If the message is more than one line, only the first will be shown.
            //      block: alwyas display message as block, even when there is only one line.
            messagePosition: 'auto',
            
            show: function(/*string | array*/messages){
                
                if (typeof messages == 'string'){
                    messages = [messages];
                }
                
                if (messages.length == 0){
                    this.hide();
                    return;
                }
                
                domClass.remove(this.domNode, 'hide');
                if ((this.messagePosition == 'auto' && messages.length > 1) || this.messagePosition == 'block'){
                    domClass.remove(this.domNode, 'help-inline');
                    domClass.add(this.domNode, 'help-block');                                        
                    this.domNode.innerHTML = messages.join('<br />');
                } else {
                    domClass.remove(this.domNode, 'help-block');
                    domClass.add(this.domNode, 'help-inline');                                        
                    this.domNode.innerHTML = messages[0];
                }             
            },
            
            hide: function(){                  
                domClass.add(this.domNode, 'hide');
                this.domNode.innerHTML = '';             
            }                       
        }
    );
});
