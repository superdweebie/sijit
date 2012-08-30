define([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/when',
        'Sds/InputAgent/BaseInputAgent'
    ],
    function (
        declare,
        Deferred,
        when,
        BaseInputAgent
    ) {
        // module:
        //		Sds/ServiceManager/Plugin/InputAgent

        return {

            dependencies: [
                'Sds/ServiceManager/Plugin/Stateful'
            ],

            refExtend: declare(
                'Sds/ServiceManager/Plugin/InputAgentRef',
                [BaseInputAgent],
                {
                    activate: function(value){
                        var activateDeferred = new Deferred;
                        when(this._serviceManager.getObject(this._identity), function(inputAgent){
                            activateDeferred.resolve(inputAgent.activate());
                        });

                        return activateDeferred;
                    },
                    reset: function(){
                        var resetDeferred = new Deferred;
                        when(this._serviceManager.getObject(this._identity), function(inputAgent){
                            resetDeferred.resolve(inputAgent.reset());
                        });

                        return resetDeferred;
                    }
                }
            )
        };
    }
);
