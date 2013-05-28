define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/keys',
    'dojo/dom-class',
    'dojo/i18n!../nls/authenticationClient',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    '../Widget/_WidgetsInTemplateMixin',
    '../Widget/_DialogMixin',
    'dojo/text!./Template/Login.html',
    '../Router/baseUrl!',
    '../IdentityClient/Identity/IdentityName/Input',
    '../IdentityClient/Identity/Credential/Input',
    '../Form/CheckBox'
],
function (
    declare,
    lang,
    keys,
    domClass,
    uiStrings,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    DialogMixin,
    template,
    baseUrl
){

    var buttons = lang.mixin(DialogMixin.Buttons, {
        // summary:
        //		Possible values of the button property in the return object.
        //
        // description:
        //      OK: indicates that the 'ok' button was clicked to dismiss the dialog
        //      CANCEL: indicates that a 'cancel' button was clicked to dismiss the dialog
        //
        //      Hotkeys are also defined.
        OK: {name: 'ok', keys: keys.ENTER},
        CANCEL: {name: 'cancel', keys: keys.ESCAPE},
        REGISTER: 'register',
        FORGOT_CREDENTIAL: 'forgotCredential'
    });

    var Login = declare(
        [Widget, TemplatedMixin, WidgetsInTemplateMixin, DialogMixin],
        {
            // templateString: string
            templateString: template,

            buttons: buttons,

            disableStateButtons: ['ok'],

            forgotCredentialRoute: baseUrl + '/identity/forgotCredential',

            registerRoute: baseUrl + '/identity/register',

            enableRememberMe: true,

            title: uiStrings.loginTitle,

            description: uiStrings.loginDescription,

            _setEnableRememberMeAttr: function(value){
                this.enableRememberMe = value;
                if (this._started){
                    if (this.enableRememberMe){
                        domClass.remove(this.rememberMe.domNode, 'hide');
                    } else {
                        domClass.add(this.rememberMe.domNode, 'hide');
                    }
                }
            }
        }
    );

    Login.buttons = buttons;
    return Login;



//    var buttons = lang.mixin(Dialog.Buttons, {
//        // summary:
//        //		Possible values of the button property in the return object.
//        //
//        // description:
//        //      OK: indicates that the 'ok' button was clicked to dismiss the dialog
//        //      CANCEL: indicates that a 'cancel' button was clicked to dismiss the dialog
//        REGISTER: 'register',
//        FORGOT_CREDENTIAL: 'forgotCredential'
//    });

//    var Login = declare(
//        [
//            Widget,
//            TemplatedMixin,
//            WidgetsInTemplateMixin
//        ],
//        {
//            templateString: template,
//
//            forgotCredentialRoute: baseUrl + '/identity/forgotCredential',
//
//            registerRoute: baseUrl + '/identity/register',
//
//            enableRememberMe: true,
//
//            show: function(value){
//                this.startup();
//                this.set('enableRememberMe', this.enableRememberMe);
//                this.dialogNode.show(value).then(lang.hitch(this, function(){
//                    this.hide();
//                }));
//                document.body.appendChild(this.domNode);
//            },
//
//            hide: function(){
//                if(this.dialogNode.get('visible')){
//                    this.dialogNode.hide();
//                }
//            },
//
//            _setEnableRememberMeAttr: function(value){
//                this.enableRememberMe = value;
//                if (this._started){
//                    if (this.enableRememberMe){
//                        domClass.remove(this.rememberMe.domNode, 'hide');
//                    } else {
//                        domClass.add(this.rememberMe.domNode, 'hide');
//                    }
//                }
//            },
//
//            _getStateAttr: function(){
//                if (this.dialogNode.get('button') == 'ok'){
//                    return this.dialogNode.get('state');
//                } else {
//                    return this.dialogNode.get('button');
//                }
//            },
//
//            reset: function(){
//                this.dialogNode.set('value', {identityName: '', credential: ''});
//                this.dialogNode.resetActivity();
//            },
//
//            _getValueAttr: function(){
//                return this.dialogNode.get('value').value;
//            },
//
//            onForgotCredentialClick: function(){
//                this.dialogNode.set('button', buttons.REGISTER);
//                this.deactivate();
//            },
//
//            onRegisterClick: function(){
//                this.dialogNode.set('button', buttons.FORGOT_CREDENTIAL);
//                this.deactivate();
//            }
//        }
//    );
//
//    Login.buttons = buttons;
//
//    return Login;
});


