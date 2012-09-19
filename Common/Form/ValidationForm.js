define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'dijit/Form/_FormMixin',
    'Sds/Common/Form/_ValidationMixin',
    'dojo/text!./Template/ValidationForm.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    FormMixin,
    ValidationMixin,
    template
){
    return declare(
        'Sds/Common/Form/ValidationForm',
        [Widget, TemplatedMixin, FormMixin, ValidationMixin],
        {
            templateString: template,

            postCreate: function(){
                this._messageStyleNode = this.formValidatorMessage;
                this.watch('value', function(){
                    this._validate();
                });
                this.inherited(arguments);
            }
        }
    );
});
