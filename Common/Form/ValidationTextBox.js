define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Common/Form/_TextBoxMixin',
    'Sds/Common/Form/_ValidationMixin',
    'Sds/Common/Form/_AppendageMixin',
    'dojo/text!./Template/ValidationTextBox.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    TextBoxMixin,
    ValidationMixin,
    AppendageMixin,
    template
){
    return declare(
        'Sds/Common/Form/ValidationTextBox',
        [Widget, TemplatedMixin, TextBoxMixin, AppendageMixin, ValidationMixin],
        {
            templateString: template,

            // message: String
            //		Currently error/prompt message.
            message: '',

            postCreate: function(){              
                this._messageStyleNode = this.domNode;
                this.inherited(arguments);
            }
        }
    );
});
