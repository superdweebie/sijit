define([
    'dojo/_base/declare',
    'Sds/Filter/Base'
],
function(
    declare,
    Base
){
    // module:
    //		Sds/Filter/Uppercase

    return declare(
        'Sds/Filter/Uppercase',
        [Base],
        {

            filter: function(value){
                return value.toUpperCase();
            }
        }
    );
});
