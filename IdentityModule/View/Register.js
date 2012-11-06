define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Mvc/BaseView',
    'dojo/text!../Template/Register.html',
    'Sds/Common/ValidationDialog',
    'get!Sds/IdentityModule/DataModel/Identity/IdentityName/Input',
    'get!Sds/IdentityModule/DataModel/Identity/Credential/Input',
    'get!Sds/IdentityModule/DataModel/Identity/Firstname/Input',
    'get!Sds/IdentityModule/DataModel/Identity/Lastname/Input',
    'get!Sds/IdentityModule/DataModel/Identity/Email/Input'
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
        'Sds/IdentityModule/RegisterView',
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
