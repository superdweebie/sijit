define([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/when',
        'Sds/ExceptionManager/ExceptionManagerInterface',
    ],
    function (
        declare,
        Deferred,
        when,
        ExceptionManagerInterface
    ) {
        // module:
        //		Sds/ServiceManager/Plugin/ExceptionManager

        return {
            
            refExtend: declare(
                'Sds/ServiceManager/Plugin/ExceptionManagerRef',
                [ExceptionManagerInterface],
                {
                    handle: function(exception){
                        var exceptionDeferred = new Deferred;
                        when(this._serviceManager.getObject(this._identity), function(exceptionManager){
                            exceptionDeferred.resolve(exceptionManager.handle(exception));
                        });

                        return exceptionDeferred;
                    }
                }
            )
        };
    }
);
