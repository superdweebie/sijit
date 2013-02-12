define([
    'dojo/_base/declare',
    './Base'
],
function(
    declare,
    Base
){
    // module:
    //		Sds/Filter/Lowercase

    return declare(
        [Base],
        {

            filter: function(value){
                return value.toLowerCase();
            }
        }
    );
});
