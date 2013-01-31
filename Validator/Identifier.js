define([
    'dojo/_base/declare',
    'Sds/Validator/Group',
    'Sds/Validator/Length',
    'Sds/Validator/IdentifierChars'
],
function(
    declare,
    Group,
    Length,
    IdentifierChars
){
    return declare(
        'Sds/Validator/Identifier',
        [Group],
        {
            constructor: function(){
                this.validators = [
                    new Length({min: 3, max: 40}),
                    new IdentifierChars()
                ]
            }
        }
    );
});
