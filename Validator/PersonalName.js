define([
    'dojo/_base/declare',
    './Group',
    './Length',
    './IdentifierChars'
],
function(
    declare,
    Group,
    Length,
    IdentifierChars
){
    return declare(
        [Group],
        {
            constructor: function(){
                this.validators = [
                    new Length({min: 1, max: 50}),
                    new IdentifierChars()
                ]
            }
        }
    );
});

