define([
    'dojo/_base/declare',
    'dojo/cldr/monetary',
    'dojo/i18n!dojo/cldr/nls/number',
    './Base'
],
function(
    declare,
    monetary,
    number,
    Base
){
    // module:
    //		Sds/Filter/PadCurrency

    return declare(
        'Sds/Filter/PadCurrency',
        [Base],
        {

            //currecny: undefined,

            filter: function(value){

                var places = monetary.getData(this.currency).places;

                var pieces = value.split(number.decimal);
                if (pieces.length > 1 && pieces[1].length < places){
                    return '' + value + '0000000'.substr(0, places - pieces[1].length);
                } else {
                    return value;
                }
            }
        }
    );
});
