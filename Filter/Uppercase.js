define([
    'dojo/_base/declare',
    './Base'
],
function(
    declare,
    Base
){
    // module:
    //		Sds/Filter/Uppercase

    return declare(
        [Base],
        {

            filter: function(value){
                return value.toUpperCase();
            }
        }
    );
});
