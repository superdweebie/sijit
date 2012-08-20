define([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'Sds/InputAgent/BaseInputAgent',
        'Sds/ServiceManager/Exception/IncorrectTypeException'
    ],
    function (
        declare,
        Deferred,
        BaseInputAgent,
        IncorrectTypeException
    ) {
        // module:
        //		Sds/ServiceManager/Plugin/Form

        return {

            dependencies: [
                'Sds/ServiceManager/Plugin/Stateful'
            ],

            serviceManagerMixin: {
                activate: function(/*string*/ identifier, /*object*/ value) {
                    // summary:
                    //     Activate the given identifier if it is a form.

                    var deferredActivate = new Deferred();

                    Deferred.when(this.getObject(identifier), function(object){
                        if ( ! object instanceof BaseInputAgent) {
                            throw new IncorrectTypeException('activeate only works for BaseInputAgent objects');
                        }
                        deferredActivate.resolve(object.activate(value));
                    });

                    return deferredActivate;
                },
                reset: function(/*string*/ identifier) {
                    // summary:
                    //     Reset the given identifier if it is a form.

                    var deferredActivate = new Deferred();

                    Deferred.when(this.getObject(identifier), function(object){
                        if ( ! object instanceof BaseInputAgent) {
                            throw new IncorrectTypeException('activeate only works for BaseInputAgent objects');
                        }
                        deferredActivate.resolve(object.reset());
                    });

                    return deferredActivate;
                }
            },
            refExtend: declare(
                'Sds.ServiceManager.Plugin.FormRef',
                [BaseInputAgent],
                {
                    activate: function(value){
                        return this._serviceManager.activate(this._identity, value);
                    },
                    reset: function(){
                        return this._serviceManager.reset(this._identity);
                    }
                }
            )
        };
    }
);
