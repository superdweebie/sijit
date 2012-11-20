define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/ExceptionModule/Exception/BaseException',
    'Sds/Mvc/BaseView',
    'dojo/text!../Template/Exception.html',
    'Sds/Common/Dialog'
],
function(
    declare,
    lang,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    BaseException,
    BaseView,
    template
){
    return declare(
        'Sds/ExceptionModule/Exception',
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            BaseView
        ],
        {
            templateString: template,

            valueType: BaseException,

            postCreate: function(){
                this.inherited(arguments);
                document.body.appendChild(this.domNode);
            },

            activate: function(value){

                var returnValue = this.inherited(arguments);

                if ( ! value){
                    value = new BaseException('An unidentified problem has occured');
                    this.set('value', value);
                }

                this.messageNode.innerHTML = value.message;
                this.dialogNode.show().then(lang.hitch(this, function(){
                    this.deactivate();
                }));

                return returnValue;
            },

            deactivate: function(){
                if(this.dialogNode.get('visible')){
                    this.dialogNode.hide();
                }
                this.inherited(arguments);
            },

            reset: function(){
                this.dialogNode.reset();
            }
        }
    );
});


