define([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'Sds/ExceptionManager/ExceptionManagerInterface',
        'Sds/ServiceManager/Exception/IncorrectTypeException'
    ],
    function (
        declare,
        Deferred,
        ExceptionManagerInterface,
        IncorrectTypeException
    ) {
        // module:
        //		Sds/ServiceManager/Plugin/Form

        return {

            serviceManagerMixin: {
                handle: function(/*string*/ identifier, /*object*/ exception) {
                    // summary:
                    //     Pass the exception to the identified exception manager

                    var deferredHandle = new Deferred();

                    Deferred.when(this.getObject(identifier), function(object){
                        if ( ! object instanceof ExceptionManagerInterface) {
                            throw new IncorrectTypeException('activeate only works for ExceptionManagerInterface objects');
                        }
                        deferredHandle.resolve(object.handle(exception));
                    });

                    return deferredHandle;
                }
            },
            refExtend: declare(
                'Sds.ServiceManager.Plugin.FormRef',
                [ExceptionManagerInterface],
                {
                    handle: function(exception){
                        return this._serviceManager.handle(this._identity, exception);
                    }
                }
            )
        };
    }
);
