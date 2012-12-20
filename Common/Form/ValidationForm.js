define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',  
    'Sds/Common/Form/_FormMixin',
    'Sds/Common/Form/_ValidationMixin',
    'Sds/Common/Form/_ValidationMessagesMixin',    
    'dojo/text!./Template/ValidationForm.html'   
],
function (
    declare,
    Widget,
    TemplatedMixin,
    FormMixin,
    ValidationMixin,
    ValidationMessagesMixin,
    template
){
    return declare(
        'Sds/Common/Form/ValidationForm',
        [Widget, TemplatedMixin, FormMixin, ValidationMixin, ValidationMessagesMixin],
        {
            templateString: template,

            // message: String
            //		Current error/prompt message.
            message: '',

            messagePosition: 'auto',
            
            suppressMessages: false,

            postCreate: function(){
                this.watch('value', function(){
                    this._startValidateTimer();
                });
                this.inherited(arguments);
            },

            _getInvalidWidgetsAttr: function(){
                var result = this.inherited(arguments);
                if (this._getChildrenState() == '' && this.get('state') != ''){
                    result.push(this);
                }
                return result;
            },

            resetActivity: function(){
                this.inherited(arguments);
                for(var index in this._descendants){
                    var widget = this._descendants[index];
                    if (widget.resetActivity){
                        widget.resetActivity();
                    }
                }
            }
        }
    );
});
