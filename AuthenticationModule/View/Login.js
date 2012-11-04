define([
    'dojo/_base/declare',
    'dojo/dom-class',    
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Mvc/BaseView',
    'Sds/Router/startedRouter!',
    'dojo/text!../Template/Login.html',
    'Sds/Common/Dialog',
    'get!Sds/AuthenticationModule/Login/IdentityName/Input',
    'get!Sds/AuthenticationModule/Login/Credential/Input',
    'get!Sds/AuthenticationModule/Login/RememberMe/Input'    
],
function(
    declare,
    domClass,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    BaseView,
    router,
    template
){
    return declare(
        'Sds/AuthenticationModule/View/Login',
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            BaseView
        ],
        {
            templateString: template,

            forgotCredentialRoute: undefined,

            registerRoute: undefined,

            enableRememberMe: true,
            
            activate: function(value){

                var returnValue = this.inherited(arguments);

                if ( ! value){
                    this.set('value', {});
                }
                this.set('enableRememberMe', this.enableRememberMe);
                
                return returnValue;
            },

            deactivate: function(){
                if(this.dialog.get('visible')){
                    this.dialog.hide();
                }
                this.inherited(arguments);
            },

            _setEnableRememberMe: function(value){
                this.enableRememberMe = value;
                if (this._started){
                    if (this.enableRememberMe){
                        domClass.remove(this.rememberMe, 'hide');
                    } else {
                        domClass.add(this.rememberMe, 'hide');                    
                    }                    
                }
            },
            
            _getStateAttr: function(){
                return this.dialog.get('state');
            },

            _getValueAttr: function(){
                return this.dialog.get('value').value;
            },
            
            onForgotCredential: function(){
                this.dialog.hide();
                router.go(this.forgotCredentialRoute);
            },
            
            onRegister: function(){
                this.dialog.hide();
                router.go(this.registerRoute);
            }
        }
    );
});


