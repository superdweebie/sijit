define ([
    'dojo/_base/array'
],
function (array) {
    // module:
    //		Sds/array
    //
    // summary:
    //      Extends dojo/_base/array with extra methods
    //

    array.subtract = function(/*array*/ removeFrom, /*array*/ removeValues){
        // summary:
        //     Remove the values in removeValues from the array removeFrom

        return array.filter(removeFrom, function(item){
            if(array.indexOf(removeValues, item) == -1){
                return true
            } else {
                return false
            }
        });
    }

    return array;
});