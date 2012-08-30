define([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/when'
    ],
    function (
        declare,
        Deferred,
        when
    ) {
        // module:
        //		Sds/ServiceManager/Plugin/UserController

        return {

            refExtend: declare(
                'Sds/ServiceManager/Plugin/UserControllerRef',
                null,
                {
                    recoverPassword: function(){
                        var recoverPasswordDeferred = new Deferred;
                        when(this._serviceManager.getObject(this._identity), function(userController){
                            recoverPasswordDeferred.resolve(userController.recoverPassword());
                        });

                        return recoverPasswordDeferred;
                    },

                    register: function(){
                        var registerDeferred = new Deferred;
                        when(this._serviceManager.getObject(this._identity), function(userController){
                            registerDeferred.resolve(userController.register());
                        });

                        return registerDeferred;
                    }
                }
            )
        };
    }
);
