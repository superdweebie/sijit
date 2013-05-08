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

        isDeferred: function(/*object*/object){
            //summary:
            //     Helper method to determine if an object is an instance of Deferred
            //
            // returns:
            //     boolean

            if (object instanceof Deferred){
                return true;
            }
            if (object && object.isInstanceOf && object.isInstanceOf(Deferred)){
                return true;
            }
            return false;
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