define ([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/DeferredList',
        'dojo/dom-attr',
        'dijit/form/Form',
        'dojox/layout/TableContainer',
        'Sds/ExceptionManager/Exception/InvalidTypeException',
        'Sds/InputAgent/BaseInputAgentModel',
        'Sds/Common/Utils',
        'Sds/Validator/DatatypeValidator'
    ],
    function (
        declare,
        Deferred,
        DeferredList,
        domAttr,
        Form,
        TableContainer,
        InvalidTypeException,
        BaseInputAgentModel,
        Utils,
        DatatypeValidator
    ){
        return declare (
            'Sds/InputAgent/FormFactory',
            null,
            {
                // summary:
                //		Will generate a form from an InputAgentModel.

                exceptionManger: undefined,

                create: function(model, metadata){

                    if ( ! model.isInstanceOf ||
                         ! model.isInstanceOf(BaseInputAgentModel)
                    ){
                        this.exceptionManager.handle(new InvalidTypeException('Model supplied to FormFactory.create must be an instance of BaseInputAgentModel'));
                        return null;
                    }

                    var formDeferred = new Deferred;

                    var form = new Form({});

                    //Add table layout to wrap form elements
                    var container = new TableContainer({cols: 1});
                    form.domNode.appendChild(container.domNode);

                    var index;
                    var deferredInputs = [];
                    for (index in metadata.fields){
                        deferredInputs.push(this._createInput(metadata.fields[index]));
                    }
                    var deferredListInputs = new DeferredList(deferredInputs);
                    deferredListInputs.then(function(inputs){
                        for (index in inputs){
                            var input = inputs[index][1];
                            input.set('value', model[input.property]);
                            container.domNode.appendChild(input.domNode);
                        }

                        container.startup();
                        formDeferred.resolve(form);
                    });

                    return formDeferred;
                },

                _createInput: function(field){

                    var inputDeferred = new Deferred;

                    var requires = [];

                    if (field.dijit){
                        requires.push(field.dijit);
                    } else {
                        requires.push('dijit/form/ValidationTextBox');
                    }
                    if (field.validator &&  typeof field.validator == 'string'){
                        requires.push(field.validator);
                    }

                    require(requires, function(Input, Validator){

                        if (field.dataType) {
                            field._dataTypeValidator = new DatatypeValidator(field.dataType);
                        }

                        if (Validator) {
                            field._validatorInstance = new Validator;
                        }

                        if (field.dataType || Validator) {
                            // Wrap Sds/Validator for consumption by ValidationTextBox, if required
                            field.validator = function(value){

                                var result = true;
                                var messages = [];

                                if (this._dataTypeValidator && ! this._dataTypeValidator.isValid(value)){
                                    result = false;
                                    messages = messages.concat(this._dataTypeValidator.get('messages'));
                                }

                                if (this._validatorInstance && ! this._validatorInstance.isValid(value)){
                                    result = false;
                                    messages = messages.concat(this._validatorInstance.get('messages'));
                                }

                                if ( ! result) {
                                    this.invalidMessage = messages.join(' ');
                                }
                                return result;
                            }
                        }

                        delete field.dijit;
                        delete field.dataType;

                        if ( ! field.title) {
                            field.title = Utils.ucFirst(field.property);
                        }

                        var input = new Input(field);
                        domAttr.set(input.domNode, 'title', field.title);

                        inputDeferred.resolve(input);
                    });

                    return inputDeferred;
                }
            }
        );
    }
);


