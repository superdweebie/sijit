define ([
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/Deferred',
    'dojo/DeferredList',
    'dijit/registry',
    'Sds/Common/utils'
],
function (
    lang,
    array,
    Deferred,
    DeferredList,
    registry,
    utils
){

    var _dijitNames =  [];

    var defaultFormModule = 'Sds/Common/Form/ValidationForm';

    var defaultInputModule = 'Sds/Common/Form/ValidationTextBox';

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
        //		Will generate a form from metadata.

        appendToForm: function(form, metadata){

            var appendDeferred = new Deferred;
            var containerNode;
            var property;

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

            //Set form metadata
            for (property in metadata){
                if (property != 'fields'){
                    form.set(property, metadata[property]);
                }
            }

            var deferredInputs = [];
            for (property in metadata.fields){
                //Create all the input elements
                deferredInputs.push(this.createInput(metadata.fields[property]));
            }
            var deferredListInputs = new DeferredList(deferredInputs);
            deferredListInputs.then(function(inputs){
                //Attach the input elements to the form
                for (var index in inputs){

                    var input = inputs[index][1];
                    containerNode.appendChild(input.domNode);
                }

                appendDeferred.resolve(form);
            });

            return appendDeferred;
        },

        createForm: function(metadata){

            var formDeferred = new Deferred;
            var formModuleDeferred = new Deferred;

            if (metadata.dijit){
                require([metadata.dijit], lang.hitch(this, function(Form){
                    formModuleDeferred.resolve(Form);
                }));
            } else {
                require([defaultFormModule], lang.hitch(this, function(Form){
                    formModuleDeferred.resolve(Form);
                }));
            }

            formModuleDeferred.then(lang.hitch(this, function(FormModule){
                var name;
                if (metadata.name){
                    name = metadata.name;
                } else {
                    name = _generateDijitId('generatedForm');
                }
                var form = new FormModule({name: name});
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

                require([defaultInputModule], function(Input){
                    inputDeferred.resolve(Input)
                });
            }

            inputDeferred.then(function(Input){

                if (field.dataType){
                    var dataTypeValidator = {
                        'class': 'Sds/Common/Validator/DatatypeValidator',
                        options: {requiredType: field.dataType}
                    };
                    if (!field.validator) {
                        field.validator = dataTypeValidator;
                    } else if (lang.isArray(field.validator)) {
                        field.validator.push(dataTypeValidator);
                    } else {
                        field.validator = [dataTypeValidator, field.validator];
                    }
                }

                delete field.dijit;
                delete field.dataType;

                field.id = _generateDijitId(field.id);
                if (field.property){
                    field.name = field.property;
                }
                if ( ! field.label && field.property){
                    field.label = utils.ucFirst(field.property) + ':';
                }
                
                createInputDeferred.resolve(new Input(field));
            });

            return createInputDeferred;
        }
    }
});


