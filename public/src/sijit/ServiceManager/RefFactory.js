define([
        'dojo/_base/declare',
        'sijit/ServiceManager/Ref'
    ],
    function (
        declare,
        Ref
    ) {
        // module:
        //		sijit/ServiceManager/RefFactory

        return declare
        (
            'sijit.ServiceManager.RefFactory',
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


