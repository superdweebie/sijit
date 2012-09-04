define ([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/_base/array',
        'dojo/dom-class',
        'dojo/Deferred',
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
        array,
        domClass,
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
            'Sds/View/FormFactory',
            null,
            {
                // summary:
                //		Will generate a form from an ViewModel.

                validatorManager: undefined,

                _dijitNames: [],

                constructor: function(){
                    this.validatorManager = new ValidatorManager;
                },

                _generateDijitId: function(name){
                    if (array.indexOf(this._dijitNames, name) == -1 && ! registry.byId(name)){
                        this._dijitNames.push(name);
                        return name;
                    }

                    var integer = 0;
                    while(array.indexOf(this._dijitNames, name + integer) >=0 || registry.byId(name + integer)){
                        ++integer;
                    }
                    this._dijitNames.push(name + integer);
                    return name + integer;
                },

                append: function(form, metadata){

                    var appendDeferred = new Deferred;
                    var containerNode;
                    var index;

                    switch (true){
                        case 'containerNode' in metadata:
                            containerNode = metadata.containerNode;
                            break;
                        case 'containerNode' in form:
                            containerNode = form.containerNode;
                            break;
                        default:
                            containerNode = form.domNode;
                    }

                    // Wrap the inputs in a table dijit
                    if (metadata.tableWrap) {
                        var table = new TableContainer({cols: 1});
                        containerNode.appendChild(table.domNode);
                        containerNode = table.domNode;
                    }

                    // Add css classes
                    for (index in metadata.cssClasses){
                        domClass.add(form.domNode, metadata.cssClasses[index]);
                    }

                    //Add form validator
                    var formValidatorDeferred = new Deferred;
                    if (metadata.validators){
                        this.validatorManager.createGroup(metadata.validators).then(lang.hitch(this, function(validator){
                            form._validator = validator;

                            this.createInput({
                                id: "formValidatorMessage",
                                dijit: "Sds/View/FormValidatorMessage",
                                validators: [
                                    {
                                        "module": "Sds/View/Validator/FormValidator"
                                    }
                                ],
                                tooltipDomNode: containerNode,
                                owningForm: form
                            }).then(function(formValidatorMessage){
                                form._formValidatorMessage = formValidatorMessage;
                                containerNode.appendChild(formValidatorMessage.domNode);
                                formValidatorDeferred.resolve(formValidatorMessage);
                            });
                        }));
                    } else {
                        formValidatorDeferred.resolve();
                    }

                    var deferredInputs = [formValidatorDeferred];
                    for (index in metadata.fields){
                        //Create all the input elements
                        deferredInputs.push(this.createInput(metadata.fields[index]));
                    }
                    var deferredListInputs = new DeferredList(deferredInputs);
                    deferredListInputs.then(function(inputs){
                        //Attach the input elements to the form
                        for (index in inputs){

                            //Skip the form validator
                            if (index == 0){
                                continue;
                            }

                            var input = inputs[index][1];
                            containerNode.appendChild(input.domNode);

                            if (form._validator){
                                aspect.after(input, 'isValid', function(result){
                                    form._validator.isValid(form.get('value'));
console.dir(form._validator.get('messages'));
                                    form._formValidatorMessage.set('value', form._validator.get('messages').join(' '));
                                    return result;
                                });
                            }
                        }

                        if (metadata.tableWrap){
                            table.startup();
                        }

                        appendDeferred.resolve(form);
                    });

                    return appendDeferred;
                },

                create: function(metadata){

                    var formDeferred = new Deferred;

                    var form = new Form({name: this._generateDijitId('generatedForm')});

                    when(this.append(form, metadata), function(form){
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
                    resourcesDeferredList.then(lang.hitch(this, function(result){

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

                        field.id = this._generateDijitId(field.id);
                        if (field.property){
                            field.name = field.property;
                        }
                        if ( ! field.title && field.property){
                            field.title = Utils.ucFirst(field.property) + ':';
                        }

                        var input = new result[0][1](field);

                        if (field.title){
                            domAttr.set(input.domNode, 'title', field.title);
                        }

                        createInputDeferred.resolve(input);

                    }));

                    return createInputDeferred;
                }
            }
        );
    }
);


