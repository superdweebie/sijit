define ([
    'dojo/Deferred'
],
function (Deferred) {
    // module:
    //		Sds/is
    //
    // summary:
    //      Provides boolean tests for values
    //

    return {

        isInt: function(value) {
            // summary:
            //		Checks if a value is an integer or can be cast into an integer

            return ((parseFloat(value) == parseInt(value)) && !isNaN(value));
        },

        isFloat: function(value) {
            // summary:
            //      Checks if a value is a float or can be cast into an integer

            return ((parseFloat(value) || parseInt(value) === 0) && !isNaN(value));
        },

        isDate: function(value) {
            // summary:
            //      Checks if a value is a date object. Will not attempt to cast a string
            //      into a date. If you need to cast strings to dates, look at dojo/date
            return value instanceof Date;
        },

        isDeferred: function(/*object*/object){
            //summary:
            //     Helper method to determine if an object is an instance of Deferred
            //
            // returns:
            //     boolean

            return (object instanceof Deferred || (object && object.isInstanceOf && object.isInstanceOf(Deferred)));
        },

        isStatic: function(/*object*/value){
            //summary:
            //     Helper method to determine if a value contains any functions.
            //     Returns true if it contains only static values.
            //     Returns false is it contains one or more functions.
            //
            // returns:
            //     boolean

            var isStatic = function(value){
                if (typeof value == 'function'){
                    return false;
                }
                if (typeof value == 'object'){
                    for(var property in value) {
                        if(value.hasOwnProperty(property) && ! isStatic(value[property])){
                            return false;
                        }
                    }
                }
                return true;
            }

            return isStatic(value);
        }
    }
});
