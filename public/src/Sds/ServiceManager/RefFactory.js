define([
        'dojo/_base/declare',
        'Sds/ServiceManager/Ref'
    ],
    function (
        declare,
        Ref
    ) {
        // module:
        //		Sds/ServiceManager/RefFactory

        return declare
        (
            'Sds.ServiceManager.RefFactory',
            null,
            {
                // summary:
                //		A generates references to get or use an object.

                serviceManager: undefined,

                constructor: function(serviceManager){
                    this.serviceManager = serviceManager;
                },

                create: function(/*string*/identity, /*array*/parentClasses){

                    parentClasses.unshift(Ref);

                    var NewRef = declare(
                        'ref.' + identity,
                        parentClasses,
                        {}
                    );

                    return new NewRef(identity, this.serviceManager);
                }
            }
        )
    }
);


