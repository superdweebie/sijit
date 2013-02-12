define([
    'dojo/_base/declare',
    './TextBox',
    './_ValidationMixin',
    './_ValidationMessagesMixin'
],
function (
    declare,
    TextBox,
    ValidationMixin,
    ValidationMessagesMixin
){
    return declare(
        [TextBox, ValidationMixin, ValidationMessagesMixin],
        {
        }
    );
});
