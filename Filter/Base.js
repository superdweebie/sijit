define([
    'dojo/_base/declare',
    '../is',
    'dojo/Stateful'
],
function(
    declare,
    is,
    Stateful
){
    // module:
    //		Sds/Filter/Base

    var Base = declare(
        [Stateful],
        {
        }
    );

    is.isFilter = function(filter){
        //summary:
        //     Extend Sds/is with helper method to determine if a filter is an instance of Base filter
        //
        // returns:
        //     boolean

        if (filter && filter.isInstanceOf && filter.isInstanceOf(Base)){
            return true;
        }
        return false;
    }

    return Base;
});
