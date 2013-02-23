define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    '../../Widget/_WidgetsInTemplateMixin',
    '../../Mvc/BaseView',
    'dojo/text!./Template/CreateIdentity.html',
    '../../Widget/Dialog',
    '../../Form/ValidationControlGroup',
    '../DataModel/Identity/IdentityName/Input',
    '../DataModel/Identity/Credential/Input',
    '../DataModel/Identity/Firstname/Input',
    '../DataModel/Identity/Lastname/Input',
    '../DataModel/Identity/Email/Input',
    '../../Form/Captcha'
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
