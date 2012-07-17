define ([
        'dojo/_base/declare',
        'dojo/_base/config'
    ],
    function (declare, config) {
        // module:
        //		sijit/common/Utils

        var utils = declare (
            'sijit.common.Utils',
            null,
            {
                // summary:
                //		Module providing simple utility methods
            }
        );

        utils.ucFirst = function(string) {
            // summary:
            //		Makes the first letter of a string uppercase

            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        utils.isInt = function(value) {
            // summary:
            //		Checks if a value is an integer

            if((parseFloat(value) == parseInt(value)) && !isNaN(value))
            {
                return true;
            } else {
                return false;
            }
        };

        utils.fullUrl = function(string) {
            // summary:
            //		Appends a relative url to the full site url. Requires
            //		config.siteUrl to be set

            return config.siteUrl + '/' + string;
        };

        utils.mixinDeep = function(dest, source) {
            //Recursively mix the properties of two objects
            var empty = {};
            for (var name in source) {
                if(!(name in dest) || (dest[name] !== source[name] && (!(name in empty) || empty[name] !== source[name]))){
                    try {
                            if ( source[name].constructor==Object ) {
                                dest[name] = utils.mixinDeep(dest[name], source[name]);
                            } else {
                                dest[name] = source[name];
                            };
                    } catch(e) {
                            // Property in destination object not set. Create it and set its value.
                            dest[name] = source[name];
                    };
                };
            }
            return dest;
        };

        return utils;
    }
);