define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Mvc/BaseView',
    'dojo/text!./Template/CreateIdentity.html',
    'Sds/Common/Dialog',
    'Sds/Form/ValidationControlGroup',
    'Sds/IdentityModule/DataModel/Identity/IdentityName/Input',
    'Sds/IdentityModule/DataModel/Identity/Credential/Input',
    'Sds/IdentityModule/DataModel/Identity/Firstname/Input',
    'Sds/IdentityModule/DataModel/Identity/Lastname/Input',
    'Sds/IdentityModule/DataModel/Identity/Email/Input',
    'Sds/Form/Captcha'
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
        'Sds/IdentityModule/View/CreateIdentity',
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
                var value = this.dialogNode.get('value').value;
                value.credential = value.credential[0];
                return value;
            }
        }
    );
});
