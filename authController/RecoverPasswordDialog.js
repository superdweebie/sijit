define
(
    [ 
        'dojo/_base/declare',
        'dojo/_base/lang',     
        'dijit/registry',
        'dijit/_Widget', 
        'dijit/_TemplatedMixin', 
        'dijit/_WidgetsInTemplateMixin', 
        'dojo/text!./templates/RecoverPasswordDialog.html',
        'sds/Dialog',
        'dojox/layout/TableContainer',
        'dijit/form/ValidationTextBox',
        'dojox/validate/regexp'
    ],
    function
    (
        declare, 
        lang,
        registry,
        _Widget, 
        templatedMixin,
        widgetsInTemplateMixin,
        template
    ) 
    {
        return declare
        (
            'sds.services.AuthService.RecoverPasswordDialog', 
            [_Widget, templatedMixin, widgetsInTemplateMixin], 
            { 
                templateString: template,
                show: function(){
                    this.recoverPasswordDialogNode.set('validator', lang.hitch(this, 'validator'));                      
                    return this.recoverPasswordDialogNode.show();
                },
                getFormValue: function(){
                    return this.recoverPasswordDialogNode.getFormValue();
                },
                resetForm: function(){
                    return this.recoverPasswordDialogNode.resetForm();
                },
                validator: function(){                 
                    var username = registry.byId('passwordRecoveryUsername');
                    var email = registry.byId('passwordRecoveryEmail');
                    if ((username.get('value') && username.isValid()) ||
                        (email.get('value') && email.isValid())){
                        return '';
                    }
                    return 'Incomplete';
                }
            }
        ); 
    }
);


