define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/ExceptionModule/Exception/BaseException',
    'Sds/View/BaseView',
    'dojo/text!./Template/ExceptionView.html',
    'Sds/Common/Dialog'
],
function(
    declare,
    lang,
    when,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    BaseException,
    BaseView,
    template
){
    return declare(
        'Sds/ExceptionModule/ExceptionView',
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            BaseView
        ],
        {
            templateString: template,

            valueType: BaseException,

            activate: function(value){

                this.inherited(arguments);

                this.exceptionMessageNode.innerHTML = value.message;
                when(this.exceptionDialogNode.show(), lang.hitch(this, function(){
                    this._resolve();
                }));

                return this._activateDeferred;
            }
        }
    );
});


