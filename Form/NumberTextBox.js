define([
    'dojo/_base/declare',
    'Sds/Form/TextBox',
    'Sds/Form/_NumberTextBoxMixin'
],
function (
    declare,
    TextBox,
    NumberTextBoxMixin
){
    return declare(
        'Sds/Form/NumberTextBox',
        [TextBox, NumberTextBoxMixin],
        {
        }
    );
});
