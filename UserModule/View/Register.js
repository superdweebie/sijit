define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Common/Form/_ValidationMixin',
    'Sds/UserModule/DataModel/User',
    'Sds/UserModule/DataModel/Profile',
    'Sds/View/BaseView',
    'Sds/UserModule/ViewModel/Register',
    'Sds/View/formFactory',
    'dojo/text!../Template/Register.html',
    'Sds/Common/Dialog'
],
function(
    declare,
    lang,
    Deferred,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    ValidationMixin,
    User,
    Profile,
    BaseView,
    RegisterViewModel,
    formFactory,
    template
){
    return declare(
        'Sds/UserModule/RegisterView',
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            BaseView
        ],
        {
            templateString: template,

            valueType: User,

            inputsAppended: false,

            postCreate: function(){

                // Extend the dialogNode so it can handle form validators
                declare.safeMixin(this.dialogNode, new ValidationMixin);
                this.dialogNode._messageStyleNode = this.formValidatorMessage;
                this.dialogNode.blockMessage = this.blockMessage;
                this.dialogNode.inlineMessage = this.inlineMessage;
                this.dialogNode.watch('value', lang.hitch(this, function(){
                    this.dialogNode._validate();
                }));

                this.inherited(arguments);

                document.body.appendChild(this.domNode);
            },

            activate: function(value){

                this.inherited(arguments);

                if ( ! value){
                    value = new User;
                    this.set('value', value);
                }

                this._appendInputs().then(lang.hitch(this, function(){
                    this.dialogNode.set('value', value);
                    this.startup();
                    this.dialogNode.show().then(lang.hitch(this, function(){
                        this._resolve();
                    }));
                }));

                return this._activateDeferred;
            },

            deactivate: function(){
                this.dialogNode.hide();
                this.inherited(arguments);
            },

            reset: function(){
                this.dialogNode.reset();
            },

            _appendInputs: function(){
                var appendInputsDeferred = new Deferred;

                if ( ! this.inputsAppened){
                    var metadata = RegisterViewModel.metadata;
                    metadata.containerNode = this.containerNode;
                    formFactory.appendToForm(this.dialogNode, metadata).then(lang.hitch(this, function(){
                        this.inputsAppened = true;
                        appendInputsDeferred.resolve();
                    }));
                } else {
                    appendInputsDeferred.resolve();
                }
                return appendInputsDeferred;
            },

            _getStateAttr: function(){
                if (this.dialogNode.get('button') == 'ok'){
                    return this.dialogNode.get('state');
                } else {
                    return this.dialogNode.get('button');
                }
            },

            _getValueAttr: function(){
                var formValue = this.dialogNode.get('value').value;

                this.value.username = formValue.username;
                this.value.password = formValue.password[0];
                this.value.firstname = formValue.firstname;
                this.value.lastname = formValue.lastname;

                this.value.profile = new Profile;
                this.value.profile.email = formValue.email;

                return this.value;
            }
        }
    );
});
