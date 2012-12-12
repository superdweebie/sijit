define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Mvc/BaseView',
    'dojo/text!../Template/ForgotCredentialCreateToken.html',
    'Sds/Common/ValidationDialog',
    'Sds/IdentityModule/DataModel/Identity/IdentityName/Input',
    'Sds/IdentityModule/DataModel/Identity/Email/Input'
],
function(
    declare,
    lang,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    BaseView,
    template
){
    return declare(
        'Sds/IdentityModule/View/ForgotCredentialCreateToken',
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            BaseView
        ],
        {
            templateString: template,

            activate: function(value){

                var returnValue = this.inherited(arguments);

                this.startup();
                this.dialogNode.show(value).then(lang.hitch(this, function(){
                    this.deactivate();
                }));
                document.body.appendChild(this.domNode);

                return returnValue;
            },

            deactivate: function(){
                if(this.dialogNode.get('visible')){
                    this.dialogNode.hide();
                }
                this.inherited(arguments);
            },

            _getStateAttr: function(){
                if (this.dialogNode.get('button') == 'ok'){
                    return this.dialogNode.get('state');
                } else {
                    return this.dialogNode.get('button');
                }
            },

            _getValueAttr: function(){
                return this.dialogNode.get('value').value;
            }
        }
    );
});
