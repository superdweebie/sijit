define
(
    [ 
        'dojo/_base/declare',
        'dijit/_Widget', 
        'dijit/_TemplatedMixin', 
        'dijit/_WidgetsInTemplateMixin', 
        'dojo/text!./templates/RegisterDialog.html',
        'sds/Dialog',
        'dojox/layout/TableContainer',
        'dijit/form/ValidationTextBox',
        'dojox/validate/regexp'
    ],
    function
    (
        declare, 
        _Widget, 
        templatedMixin,
        widgetsInTemplateMixin,
        template
    ) 
    {
        return declare
        (
            'sds.services.AuthService.RegisterDialog', 
            [_Widget, templatedMixin, widgetsInTemplateMixin], 
            { 
                templateString: template,
                show: function(){                     
                    return this.registerDialogNode.show();
                },
                getFormValue: function(){
                    return this.registerDialogNode.getFormValue();
                },
                resetForm: function(){
                    return this.registerDialogNode.resetForm();
                }
            }
        ); 
    }
);


