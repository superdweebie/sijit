define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Common/_DialogMixin',
    'Sds/Common/Form/_ValidationMixin',
    'dojo/text!./Template/ValidationDialog.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    DialogMixin,
    ValidationMixin,
    template
){
    // module:
    //		Sds/Common/ValidationDialog

    return declare(
        'Sds/Common/ValidationDialog',
        [Widget, TemplatedMixin, DialogMixin, ValidationMixin],
        {
            // templateString: string
            //      The widget template. To override this, use the paths directive on the AMD loader.
            templateString: template,

            postCreate: function(){
                this._messageStyleNode = this.formValidatorMessage;
                this.watch('value', function(){
                    this._startValidateTimer();
                });
                this.inherited(arguments);
            },

            _getIinvalidWidgetsAttr: function(){
                var result = this.inherited(arguments);
                if (this._getChildrenState() == '' && this.get('state') != ''){
                    result.push(this);
                }
                return result;
            }
        }
    );
});
