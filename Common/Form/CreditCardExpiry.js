define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'Sds/Validator/CreditCardExpiryValidator',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/form/_FormValueMixin',
    'dojo/text!./Template/CreditCardExpiry.html',
],
function (
    declare,
    lang,
    domClass,
    CreditCardExpiryValidator,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    FormValueMixin,
    template
    ){
    return declare(
        'Sds/Common/Form/CreditCardExpiry',
        [Widget, TemplatedMixin, WidgetsInTemplateMixin, FormValueMixin, ValidatorMixin],
        {
            templateString: template,

            type: undefined,
            
            gateway: undefined,
            
            form: undefined,
            
            _getValueAttr: function(){
                if (this.radioButton.get('checked') == true){
                    var value = {type: this.type, gateway: this.gateway};
                    if (this.form){
                        return lang.mixin(this.form.get('value'), value);                
                    } else {
                        return value;
                    }
                } else {
                    return {};
                }                
            },
            
            _getStateAttr: function(){
                if (this.form && this.radioButton && this.radioButton.get('checked') == true){
                    return this.form.get('state');
                } else {
                    return '';
                }
            },
            
            _setLabelAttr: function(value){
                this.radioButton.set('label', value);
            },

            _setIconAttr: function(value){
                this.radioButton.set('icon', value);
            },

            constructor: function(props){
                lang.mixin(this, props);
                this.state = '';
            },

            postCreate: function() {

                this.inherited(arguments);

                this.radioButton.watch('checked', lang.hitch(this, function(p, o, newValue){ 
                    if(newValue==true) {
                        this.showForm();
                    } else {
                        this.hideForm();
                    }
                    this.set('value', this.get('value'));
                    this.set('state', this.get('state'));                    
                }));

                if(this.type == 'credit') {
                    this.form = new CreditCard;

                    this.containerNode.appendChild(this.form.domNode);
                    this.form.startup();
                    //this.helpTip = 'This will allow you to pay with your credit card';
                } else if (this.type == 'paypal') {
                    this.form = undefined;
                    //this.helpTip = 'This will redirect you to paypal to complete the transaction';
                }
                
                if(this.form){
                    this.form.watch('state', lang.hitch(this, function(p, o, n){
                        this.set('state', this.get('state'));
                    }));
                    this.form.watch('value', lang.hitch(this, function(p, o, n){
                        this.set('value', this.get('value'));
                    }));                    
                }
            },

            showForm: function() {
                domClass.remove(this.containerNode,'hide');
            },

            hideForm: function() {
                domClass.add(this.containerNode,'hide');
            },
            
            showErrors: function() {
                if(this.form) {
                    this.form.showErrors();
                }
            }
        }
    );
});
