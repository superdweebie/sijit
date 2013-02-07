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
        'Sds/Filter/Uppercase',
        [Base],
        {

            filter: function(value){
                return value.toUpperCase();
            }
        }
    );
});
