define([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'sijit/Form/FormInterface',
        'sijit/ServiceManager/Exception/IncorrectTypeException'
    ],
    function (
        declare,
        Deferred,
        FormInterface,
        IncorrectTypeException
    ) {
        // module:
        //		sijit/ServiceManager/Plugin/Form

        return {

            dependencies: [
                'sijit/ServiceManager/Plugin/Stateful'
            ],

            serviceManagerMixin: {
                activate: function(/*string*/ identifier) {
                    // summary:
                    //     Activate the given identifier if it is a form.

                    var deferredActivate = new Deferred();

                    Deferred.when(this.getObject(identifier), function(object){
                        if ( ! object instanceof FormInterface) {
                            throw new IncorrectTypeException('activeate only works for forminterface objects');
                        }
                        deferredActivate.resolve(object.activate());
                    });

                    return deferredActivate;
                },
                reset: function(/*string*/ identifier) {
                    // summary:
                    //     Reset the given identifier if it is a form.

                    var deferredActivate = new Deferred();

                    Deferred.when(this.getObject(identifier), function(object){
                        if ( ! object instanceof FormInterface) {
                            throw new IncorrectTypeException('activeate only works for forminterface objects');
                        }
                        deferredActivate.resolve(object.reset());
                    });

                    return deferredActivate;
                }
            },
            refExtend: declare(
                'sijit.ServiceManager.Plugin.FormRef',
                [FormInterface],
                {
                    activate: function(){
                        return this._serviceManager.activate(this._identity);
                    },
                    reset: function(){
                        return this._serviceManager.reset(this._identity);
                    }
                }
            )
        };
    }
);
