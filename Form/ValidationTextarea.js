define([
    'dojo/_base/declare',
    './Textarea',
    './_ValidationMixin',
    './_ValidationMessagesMixin',
    './_RequiredStarMixin'
],
function (
    declare,
    Textarea,
    ValidationMixin,
    ValidationMessagesMixin,
    RequiredStarMixin
){
    return declare(
        [Textarea, ValidationMixin, ValidationMessagesMixin, RequiredStarMixin],
        {
        }
    );
});
