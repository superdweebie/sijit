define([
    'dojo/_base/declare',
    'dojo/number',
    'dojo/cldr/monetary',
    'dojo/i18n!dojo/cldr/nls/number',
    './Base'
],
function(
    declare,
    number,
    monetary,
    localNumber,
    Base
){
    // module:
    //		Sds/Filter/Currency

    return declare(
        [Base],
        {

            //currecny: undefined,

            filter: function(value){

                //don't do anyting for null, undefined, etc
                if (!value){
                    return value
                }

                var places = monetary.getData(this.currency).places;

                var pieces = ('' + value).split(localNumber.decimal);
                if (pieces.length > 1) {
                    if (pieces[1].length < places) {
                        return '' + value + '0000000'.substr(0, places - pieces[1].length);
                    }
                    if (pieces[1].length > places) {
                        return number.round(value, places);
                    }
                }

                return value;
            }
        }
    );
});
