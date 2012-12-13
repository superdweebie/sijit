define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Common/Form/_TextBoxMixin',
    'dojo/text!./Template/Textarea.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    TextBoxMixin,
    template
){
    return declare(
        'Sds/Common/Form/Textarea',
        [Widget, TemplatedMixin, TextBoxMixin],
        {
            templateString: template,
            
            postCreate: function(){
                this.set('value', this.textbox.value);
                this.inherited(arguments);
            }            
        }
    );
});
