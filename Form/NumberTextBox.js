define([
    'dojo/_base/declare',
    './TextBox',
    './_NumberTextBoxMixin'
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
