define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    './_TextBoxMixin',
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
