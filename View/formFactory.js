define ([
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-class',
    'dojo/Deferred',
    'dojo/DeferredList',
    'dijit/registry',
    'Sds/Common/Validator/validatorFactory',
    'Sds/Common/Utils'
],
function (
    lang,
    array,
    domClass,
    Deferred,
    DeferredList,
    registry,
    validatorFactory,
    Utils
){

    var _dijitNames =  [];

    function _generateDijitId(name){
        if (array.indexOf(this._dijitNames, name) == -1 && ! registry.byId(name)){
            _dijitNames.push(name);
            return name;
        }

        var integer = 0;
        while(array.indexOf(this._dijitNames, name + integer) >=0 || registry.byId(name + integer)){
            ++integer;
        }
        _dijitNames.push(name + integer);
        return name + integer;
    }

    return {
        // summary:
        //		Will generate a form from an ViewModel.

        appendToForm: function(form, metadata){

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
                validatorFactory.createGroup(metadata.validatorGroup).then(lang.hitch(this, function(validator){
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
                }

                appendDeferred.resolve(form);
            });

            return appendDeferred;
        },

        createForm: function(metadata){

            var formDeferred = new Deferred;

            require(['Sds/Common/Form/ValidationForm'], lang.hitch(this, function(Form){
                var form = new Form({name: _generateDijitId('generatedForm')});
                this.appendToForm(form, metadata).then(function(form){
                    formDeferred.resolve(form);
                });
            }));

            return formDeferred;
        },

        createInput: function(field){

            var createInputDeferred = new Deferred;

            // Load the input dijit
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

            // Load any required field validators
            var deferredValidator = new Deferred;
            var validators = []

            if (field.required){
                validators.push({
                    'class': 'Sds/Common/Validator/RequiredValidator',
                    options: null
                });
            } else {
                validators.push({
                    'class': 'Sds/Common/Validator/NotRequiredValidator',
                    options: null
                });
            }

            if (field.dataType){
                validators.push({
                    'class': 'Sds/Common/Validator/DatatypeValidator',
                    options: {requiredType: field.dataType}
                });
            }

            if (field.validatorGroup){
                validators = validators.concat(field.validatorGroup);
            }

            if (validators.length > 0){
                validatorFactory.createGroup(validators).then(function(validatorGroup){
                    deferredValidator.resolve(validatorGroup);
                });
            } else {
                deferredValidator.resolve();
            }

            var resourcesDeferredList = new DeferredList([inputDeferred, deferredValidator]);
            resourcesDeferredList.then(lang.hitch(this, function(result){

                if (field.dataType || field.validatorGroup) {
                    field.validator = result[1][1];
                }

                delete field.dijit;
                delete field.dataType;
                delete field.validatorGroup;

                field.id = _generateDijitId(field.id);
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
});


