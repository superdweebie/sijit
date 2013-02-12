define([
    'dojo/_base/declare',
    'dojo/Stateful'
],
function(
    declare,
    Stateful
){
    // module:
    //		Sds/Filter/Base

    var Base = declare(
        [Stateful],
        {
        }
    );

    Base.isFilter = function(filter){
        //summary:
        //     Helper method to determine if a filter is an instance of Base filter
        //
        // returns:
        //     boolean

        if (filter.isInstanceOf && filter.isInstanceOf(Base)){
            return true;
        }
        return false;
    }

    return Base;
});
