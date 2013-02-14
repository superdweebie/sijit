define([
    'dojo/_base/declare',
    './TextBox',
    './_ValidationMixin',
    './_ValidationMessagesMixin',
    './_RequiredStarMixin'
],
function (
    declare,
    TextBox,
    ValidationMixin,
    ValidationMessagesMixin,
    RequiredStarMixin
){
    return declare(
        [TextBox, ValidationMixin, ValidationMessagesMixin, RequiredStarMixin],
        {
        }
    );
});
