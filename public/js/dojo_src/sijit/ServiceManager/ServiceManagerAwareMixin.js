define ([
        'dojo/_base/declare'
    ],
    function (
        declare
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
                //      The ServiceManager will be automatically injected

                // isServiceManagerAware: boolean
                //      The serviceManager looks for this property. If it is found,
                //      then the serivceManager instance is injected.
                isServiceManagerAware: true,

                // serviceManager: Object
                //		The serviceManager instance
                serviceManager: undefined
            }
        );
    }
);


