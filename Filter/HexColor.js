define([
    'dojo/_base/declare',
    './Base'
],
function(
    declare,
    Base
){
    // module:
    //		Sds/Filter/HexColor

    return declare(
        'Sds/Filter/HexColor',
        [Base],
        {

            filter: function(value){
                return '#' + value;
            }
        }
    );
});
