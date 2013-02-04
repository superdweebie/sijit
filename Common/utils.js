define ([
    'dojo/_base/lang',
    'dojo/_base/config',
    'dojo/_base/array',
    'dojo/Deferred'
],
function (lang, config, array, Deferred) {
    // module:
    //		Sds/Common/utils

    function mixinDeep(dest, source) {
        // summary:
        //      Recursively mix the properties of two objects

        for (var name in source) {
            if( ! (name in dest)){
                dest[name] = source[name];
                continue;
            }
            if (dest[name] != source[name]){
                if ( source[name].constructor==Object ) {
                    dest[name] = mixinDeep(dest[name], source[name]);
                } else if (lang.isArray(dest[name]) && lang.isArray(source[name])){
                    // Concat arrays, rather than overwrite
                    dest[name] = dest[name].concat(source[name]);
                } else {
                    dest[name] = source[name];
                }
            }
        }
        return dest;
    }

    return {
		// summary:
		//		Simple untilities functions used by other modules in the Sds package.

        ucFirst: function(string) {
            // summary:
            //		Makes the first letter of a string uppercase

            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        isInt: function(value) {
            // summary:
            //		Checks if a value is an integer

            if((parseFloat(value) == parseInt(value)) && !isNaN(value))
            {
                return true;
            } else {
                return false;
            }
        },

        isFloat: function(value) {
            // summary:
            //      Checks if a value is a float

            if ((parseFloat(value) || parseInt(value) === 0) && !isNaN(value)){
                return true;
            } else {
                return false;
            }
        },

        fullUrl: function(string) {
            // summary:
            //		Appends a relative url to the full site url. Requires
            //		config.siteUrl to be set

            return config.siteUrl + '/' + string;
        },

        mixinDeep: function(/*object*/ dest, /*object*/ source) {
            return mixinDeep(dest, source);
        },

        countProperties: function (/*object*/ object) {
            //summary:
            //     Count the properties of an object

            var count = 0;

            for(var property in object) {
                if(object.hasOwnProperty(property)){
                    ++count;
                }
            }
            return count;
        },

        arraySubtract: function(/*array*/ removeFrom, /*array*/ removeValues){
            // summary:
            //     Remove the values in removeValues from the array removeFrom

            return array.filter(removeFrom, function(item){
                if(array.indexOf(removeValues, item) == -1){
                    return true
                } else {
                    return false
                }
            });
        },

        isDeferred: function(/*object*/object){
            //summary:
            //     Helper method to determine if an object is an instance of Deferred
            //
            // returns:
            //     boolean

            if (object instanceof Deferred){
                return true;
            }
            if (object.isInstanceOf && object.isInstanceOf(Deferred)){
                return true;
            }
            return false;
        }
    }
});