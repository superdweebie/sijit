define([
    'dojo/_base/declare',
    './Textarea',
    './_ValidationMixin',
    './_ValidationMessagesMixin',
    './_RequiredAppendageMixin'
],
function (
    declare,
    Textarea,
    ValidationMixin,
    ValidationMessagesMixin,
    RequiredAppendageMixin
){
    return declare(
        [Textarea, ValidationMixin, ValidationMessagesMixin, RequiredAppendageMixin],
        {
        }
    );
});
