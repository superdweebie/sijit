define([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/_base/lang',
        'dijit/registry',
        'dojo/aspect',
        'sijit/common/Utils'
    ],
    function (
        declare,
        Deferred,
        lang,
        registry,
        aspect,
        Utils
    ) {
        // module:
        //		sijit/serviceManager/Ref

        var serviceManager = declare
        (
            'sijit.serviceManager.Ref',
            null,
            {
                // summary:
                //		A reference to get or use an object.
                //
                // description:
                //		The config property may be populated with a config object that
                //		defines what to inject.
                // some functions:
                //    createObject
                //    getObject
                //
                // If the asyncObject's config is marked as stateful: true, then it has and additional three functions
                // injected:
                //    get
                //    set
                //    watch

            }
        )
    }
);


