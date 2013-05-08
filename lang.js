define ([
    'dojo/_base/lang'
],
function (lang) {
    // module:
    //		Sds/lang
    //
    // summary:
    //      Extends dojo/_base/lang with extra functions
    //

    lang.mixinDeep = function(dest, source) {
        // summary:
        //      Recursively mix the properties of two objects

        var mixinDeep = function(dest, source) {
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

        return mixinDeep(dest, source);
    }

    lang.countProperties = function (/*object*/ object) {
        //summary:
        //     Count the properties of an object

        var count = 0;

        for(var property in object) {
            if(object.hasOwnProperty(property)){
                ++count;
            }
        }
        return count;
    }

    return lang;
});