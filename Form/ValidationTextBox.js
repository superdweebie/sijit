define([
    'dojo/_base/declare',
    './TextBox',
    './_ValidationMixin',
    './_ValidationMessagesMixin',
    './_RequiredAppendageMixin'
],
function (
    declare,
    TextBox,
    ValidationMixin,
    ValidationMessagesMixin,
    RequiredAppendageMixin
){
    return declare(
        [TextBox, ValidationMixin, ValidationMessagesMixin, RequiredAppendageMixin],
        {
        }
    );
});
