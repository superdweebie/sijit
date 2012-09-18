define ([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/_base/array',
        'dojo/dom-class',
        'dojo/Deferred',
        'dojo/DeferredList',
        'dojo/when',
        'dojo/aspect',
        'Sds/Common/Form/ValidationForm',
        'dijit/registry',
        'Sds/Common/Validator/ValidatorManager',
        'Sds/Common/Utils'
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
        Form,
        registry,
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

                    // Add css classes
                    for (index in metadata.cssClasses){
                        domClass.add(form.domNode, metadata.cssClasses[index]);
                    }

                    //Add form validator
                    var formValidatorDeferred = new Deferred;
                    if (metadata.validatorGroup){
                        this.validatorManager.createGroup(metadata.validatorGroup).then(lang.hitch(this, function(validator){
                            form.set('validator', validator);
                            formValidatorDeferred.resolve();
                        }));
                    } else {
                        formValidatorDeferred.resolve();
                    }

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

//                            if (form._validator){
//                                aspect.after(input, 'isValid', function(result){
//                                    form._validator.isValid(form.get('value'));
//                                    form._formValidatorMessage.set('value', form._validator.get('messages').join(' '));
//                                    return result;
//                                });
//                            }
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
                        require(['Sds/Common/Form/ValidationTextBox'], function(Input){
                            inputDeferred.resolve(Input)
                        });
                    }

                    // Load any required validators
                    var deferredValidator = new Deferred;
                    var validators = []
                    if (field.dataType){
                        validators.push({module: 'Sds/Common/Validator/DatatypeValidator', options: {requiredType: field.dataType}});
                    }
                    if (field.validatorGroup){
                        validators = validators.concat(field.validatorGroup);
                    }

                    if (validators.length > 0){
                        when(this.validatorManager.createGroup(field.validatorGroup), function(validatorGroup){
                            deferredValidator.resolve(validatorGroup);
                        });
                    } else {
                        deferredValidator.resolve();
                    }

                    var resourcesDeferredList = new DeferredList([inputDeferred, deferredValidator]);
                    resourcesDeferredList.then(lang.hitch(this, function(result){

                        if (field.validatorGroup) {
                            field.validator = result[1][1];
                        }

                        if (field.dataType || field.validatorGroup) {
                            field.validator = result[1][1];
                        }

                        delete field.dijit;
                        delete field.dataType;
                        delete field.validatorGroup;

                        field.id = this._generateDijitId(field.id);
                        if (field.property){
                            field.name = field.property;
                        }
                        if ( ! field.label && field.property){
                            field.label = Utils.ucFirst(field.property) + ':';
                        }

                        var input = new result[0][1](field);

                        createInputDeferred.resolve(input);

                    }));

                    return createInputDeferred;
                }
            }
        );
    }
);


