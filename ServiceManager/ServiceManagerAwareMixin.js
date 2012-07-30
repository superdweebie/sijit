define ([
        'dojo/_base/declare',
        'dojo/_base/connect',
        'dojo/_base/lang',
        'dojo/_base/Deferred'
    ],
    function (
        declare,
        connect,
        lang,
        Deferred
    ){
        // module:
        //		sijit/ServiceManager/ServiceManagerAwareMixin

        return declare (
            'sijit.ServiceManager.ServiceManagerAwareMixin',
            null,
            {
                // summary:
                //		Can be mixed into objects that need to be explicitly aware
                //		of the ServiceManager
                //
                // description:
                //      The ServiceManager can be retrieved by calling `this.serviceManager()`

                // serviceManager: Object
                //		The serviceManager instace
                serviceManager: undefined,

                // serviceManagerDeferred: Object
                //		Will resolve when the serviceManager is set
                serviceManagerDeferred: undefined,

                constructor: function(){
                    this.serviceManagerDeferred = new Deferred();
                    connect.subscribe('postBootstrap', lang.hitch(this, function(object){
                        this.serviceManager = object.serviceManager;
                        this.serviceManagerDeferred.resolve(object.serviceManager);
                    }));
                }
            }
        );
    }
);


