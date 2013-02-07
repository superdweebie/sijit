define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    './Base'
],
function(
    declare,
    lang,
    Base
){
    // module:
    //		Sds/Filter/Trim

    return declare(
        'Sds/Filter/Trim',
        [Base],
        {
            // summary:
            //		Filter that will remove leading and trailing whitespace

            filter: function(value){
                return lang.trim(value);
            }
        }
    );
});
