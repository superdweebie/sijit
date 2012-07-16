define ([
        'dojo/_base/declare',
        'sijit/service/ServiceManager'
    ],
    function (
        declare,
        ServiceManager
    ){
        // module:
        //		sijit/serviceManager/ServiceManagerAwareMixin

        return declare (
            'sijit.serviceManager.ServiceManagerAwareMixin',
            null,
            {
                // summary:
                //		Can be mixed into objects that need to be explicitly aware
                //		of the ServiceManager
                //
                // description:
                //      The ServiceManager can be retrieved by calling `this.serviceManager()`

                // _serviceManager: Object
                //		The serviceManager instace
                _serviceManager: undefined,

                serviceManager: function(){
                    // summary:
                    //      retrieves the serviceManager instance.

                    if(!this._serviceManager){
                        this._serviceManager = ServiceManager.getInstance();
                    }
                    return this._serviceManager;
                }
            }
        );
    }
);


