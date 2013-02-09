define([
    'dojo/_base/declare',
    'dojo/_base/array',
    './TextBox'
],
function (
    declare,
    array,
    TextBox
){
    return declare(
        'Sds/Form/HexColor',
        [TextBox],
        {
            prepend: '#',

            filter: 'HexColor',

            blurFormat: function(value){
                //remove leading hash
                if (value[0] == '#'){
                    value = value.substr(1);
                }

                //uppercase
                value = value.toUpperCase();

                //shorten length
                if (value.length > 6){
                    value = value.substr(0, 6);
                }

                //remove non hex characters
                value = array.map(value, function(chr){
                    if ('0123456789ABCDEF'.contains(chr)){
                        return chr;
                    }
                    return null;
                }).join('');

                //lengthen
                if (value.length < 6){
                    value = value + '000000'.substr(0, 6 - value.length);
                }

                return value;
            }
        }
    );
});
