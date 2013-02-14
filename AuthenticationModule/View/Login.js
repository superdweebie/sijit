define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    '../../Mvc/BaseView',
    'dojo/text!../Template/Login.html',
    '../../Router/baseUrl!',
    '../../Widget/Dialog',
    '../../IdentityModule/DataModel/Identity/IdentityName/Input',
    '../../IdentityModule/DataModel/Identity/Credential/Input',
    '../../Form/CheckBox'
],
function(
    declare,
    lang,
    domClass,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    BaseView,
    template,
    baseUrl,
    Dialog
){

    var buttons = lang.mixin(Dialog.Buttons, {
        // summary:
        //		Possible values of the button property in the return object.
        //
        // description:
        //      OK: indicates that the 'ok' button was clicked to dismiss the dialog
        //      CANCEL: indicates that a 'cancel' button was clicked to dismiss the dialog
        REGISTER: 'register',
        FORGOT_CREDENTIAL: 'forgotCredential'
    });

    var Login = declare(
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            BaseView
        ],
        {
            templateString: template,

            forgotCredentialRoute: baseUrl + '/identity/forgotCredential',

            registerRoute: baseUrl + '/identity/register',

            enableRememberMe: true,

            activate: function(value){

                var returnValue = this.inherited(arguments);

                this.startup();
                this.set('enableRememberMe', this.enableRememberMe);
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

            _setEnableRememberMeAttr: function(value){
                this.enableRememberMe = value;
                if (this._started){
                    if (this.enableRememberMe){
                        domClass.remove(this.rememberMe.domNode, 'hide');
                    } else {
                        domClass.add(this.rememberMe.domNode, 'hide');
                    }
                }
            },

            _getStateAttr: function(){
                if (this.dialogNode.get('button') == 'ok'){
                    return this.dialogNode.get('state');
                } else {
                    return this.dialogNode.get('button');
                }
            },

            reset: function(){
                this.dialogNode.set('value', {identityName: '', credential: ''});
                this.dialogNode.resetActivity();
            },

            _getValueAttr: function(){
                return this.dialogNode.get('value').value;
            },

            onForgotCredentialClick: function(){
                this.dialogNode.set('button', buttons.REGISTER);
                this.deactivate();
            },

            onRegisterClick: function(){
                this.dialogNode.set('button', buttons.FORGOT_CREDENTIAL);
                this.deactivate();
            }
        }
    );

    Login.buttons = buttons;

    return Login;
});


