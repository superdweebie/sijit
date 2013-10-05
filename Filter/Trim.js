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
        [Base],
        {
            // summary:
            //		Filter that will remove leading and trailing whitespace

            filter: function(value){
                if (typeof value == 'string'){
//                    return lang.trim(value);
                    return value;
                }
                return value;
            }
        }
    );
});
