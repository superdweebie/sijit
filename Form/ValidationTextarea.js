define([
    'dojo/_base/declare',
    './Textarea',
    './_ValidationMixin',
    './_ValidationMessagesMixin'
],
function (
    declare,
    Textarea,
    ValidationMixin,
    ValidationMessagesMixin
){
    return declare(
        [Textarea, ValidationMixin, ValidationMessagesMixin],
        {
        }
    );
});
