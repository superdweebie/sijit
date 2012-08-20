define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/ExceptionManager/Exception/BaseException',
    'Sds/InputAgent/BaseInputAgent',
    'dojo/text!./Template/ExecptionInputAgent.html',
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
    BaseInputAgent,
    template
){
    return declare(
        'Sds.ExceptionManager.ExceptionInputAgent',
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            BaseInputAgent
        ],
        {
            templateString: template,

            valueType: BaseException,

            activate: function(value){

                this.inherited(value);

                this.exceptionMessageNode.innerHTML = value.message;
                when(this.exceptionDialogNode.show(), lang.hitch(this, function(){
                    this._resolve();
                }));

                return this._activateDeferred;
            }
        }
    );
});


