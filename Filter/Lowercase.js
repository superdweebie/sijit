define([
    'dojo/_base/declare',
    'Sds/Filter/Base'
],
function(
    declare,
    Base
){
    // module:
    //		Sds/Filter/Lowercase

    return declare(
        'Sds/Filter/Lowercase',
        [Base],
        {

            filter: function(value){
                return value.toLowerCase();
            }
        }
    );
});
