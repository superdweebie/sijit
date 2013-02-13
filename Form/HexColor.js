define([
    'dojo/_base/declare',
    './ValidationTextBox',
    '../Filter/HexColor',
    '../Validator/HexColor'
],
function (
    declare,
    ValidationTextBox
){
    return declare(
        [ValidationTextBox],
        {
            prepend: '#',

            filter: 'HexColor',

            validator: 'HexColor',

            blurFormat: function(value){
                //remove leading hash
                if (value[0] == '#'){
                    value = value.substr(1);
                }

                return value;
            }
        }
    );
});
