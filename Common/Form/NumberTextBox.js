define([
    'dojo/_base/declare',
    'Sds/Common/Form/TextBox',
    'Sds/Common/Form/_NumberTextBoxMixin'
],
function (
    declare,
    TextBox,
    NumberTextBoxMixin
){
    return declare(
        'Sds/Common/Form/NumberTextBox',
        [TextBox, NumberTextBoxMixin],
        {
        }
    );
});
