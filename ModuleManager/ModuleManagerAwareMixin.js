define ([
        'dojo/_base/declare'
    ],
    function (
        declare
    ){
        // module:
        //		Sds/ModuleManager/ModuleManagerAwareMixin

        return declare (
            [],
            {
                // summary:
                //		Can be mixed into objects that need to be explicitly aware
                //		of the ModuleManager
                //
                // description:
                //      The ModuleManager will be automatically injected

                // isModuleManagerAware: boolean
                //      The moduleManager looks for this property. If it is found,
                //      then the serivceManager instance is injected.
                isModuleManagerAware: true,

                // moduleManager: Object
                //		The moduleManager instance
                moduleManager: undefined
            }
        );
    }
);


