define ([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/_base/Deferred',
        'dojo/DeferredList',
        'dojo/when',
        'dojo/aspect',
        'dojo/dom-attr',
        'dijit/form/Form',
        'dijit/registry',
        'dojox/layout/TableContainer',
        'Sds/Validator/ValidatorManager',
        'Sds/Common/Utils',
        'dojox/layout/TableContainer',
    ],
    function (
        declare,
        lang,
        Deferred,
        DeferredList,
        when,
        aspect,
        domAttr,
        Form,
        registry,
        TableContainer,
        ValidatorManager,
        Utils
    ){
        return declare (
            'Sds/InputAgent/FormFactory',
            null,
            {
                // summary:
                //		Will generate a form from an InputAgentModel.

                validatorManager: undefined,

                constructor: function(){
                    this.validatorManager = new ValidatorManager;
                },

                _generateFormName: function(){
                    var integer = 0;
                    var name = 'generatedForm';
                    while(registry.byId(name + integer)){
                        ++integer;
                    }
                    return name + integer;
                },

                append: function(form, metadata, tableWrap){

                    var appendDeferred = new Deferred;
                    var containerNode;

                    //Add form level validator - will be checked if all input elements have valid state
                    if (metadata.validators){
                        this.validatorManager.createGroup(metadata.validators).then(function(validator){
                            form._validator = validator;
                            aspect.after(form, '_getState', function(state){
                                if (state == '' && ! this._validator.isValid(this.get('value'))){
                                    state = 'Error';
                                }
                                return state;
                            });
                        });
                    }

                    if (form.containerNode){
                        containerNode = form.containerNode;
                    } else {
                        containerNode = form.domNode;
                    }

                    // Wrap the inputs in a table dijit
                    if (tableWrap) {
                        var table = new TableContainer({cols: 1});
                        containerNode.appendChild(table.domNode);
                        containerNode = table.domNode;
                    }

                    var index;
                    var deferredInputs = [];
                    for (index in metadata.fields){
                        //Create all the input elements
                        deferredInputs.push(this.createInput(metadata.fields[index]));
                    }
                    var deferredListInputs = new DeferredList(deferredInputs);
                    deferredListInputs.then(function(inputs){
                        //Attach the input elements to the form
                        for (index in inputs){
                            var input = inputs[index][1];
                            containerNode.appendChild(input.domNode);
                        }

                        if (tableWrap){
                            table.startup();
                        }
                        appendDeferred.resolve(form);
                    });

                    return appendDeferred;
                },

                create: function(metadata, tableWrap){

                    var formDeferred = new Deferred;

                    var form = new Form({name: this._generateFormName()});

                    when(this.append(form, metadata, tableWrap), function(form){
                        formDeferred.resolve(form);
                    });

                    return formDeferred;
                },

                createInput: function(field){

                    var createInputDeferred = new Deferred;

                    // Load the imput dijit
                    var inputDeferred = new Deferred;
                    if (field.dijit){
                        require([field.dijit], function(Input){
                            inputDeferred.resolve(Input)
                        });
                    } else {
                        require(['dijit/form/ValidationTextBox'], function(Input){
                            inputDeferred.resolve(Input)
                        });
                    }

                    // Load any required validators
                    var deferredValidator = new Deferred;
                    var validators = []
                    if (field.dataType){
                        validators.push({module: 'Sds/Validator/DatatypeValidator', options: null});
                    }
                    if (field.validators){
                        validators = validators.concat(field.validators);
                    }

                    if (validators.length > 0){
                        when(this.validatorManager.createGroup(field.validators), function(validatorGroup){
                            deferredValidator.resolve(validatorGroup);
                        });
                    } else {
                        deferredValidator.resolve();
                    }

                    var resourcesDeferredList = new DeferredList([inputDeferred, deferredValidator]);
                    resourcesDeferredList.then(function(result){

                        if (field.validators) {
                            field._validator = result[1][1];
                        }

                        if (field.dataType || field.validators) {
                            // Wrap Sds/Validator/ValidatorGroup for consumption by ValidationTextBox
                            field.validator = function(value){

                                var result = true;
                                var messages = [];

                                if ( ! this.required && value == ''){
                                    return result;
                                }

                                //Check datatype validator
                                if (this._validator && ! this._validator.isValid(value)){
                                    result = false;
                                    messages = this._validator.get('messages');
                                }

                                if ( ! result) {
                                    this.invalidMessage = messages.join(' ');
                                }
                                return result;
                            }
                        }

                        delete field.dijit;
                        delete field.dataType;

                        field.name = field.property;
                        if ( ! field.title){
                            field.title = Utils.ucFirst(field.name) + ':';
                        }

                        var input = new result[0][1](field);

                        domAttr.set(input.domNode, 'title', field.title);

                        createInputDeferred.resolve(input);

                    });

                    return createInputDeferred;
                }
            }
        );
    }
);


