define([
    'dojo/_base/declare',
    './ValidationTextBox',
    'dojo/text!./Template/PasswordTextBox.html'
],
function (
    declare,
    ValidationTextBox,
    template
){
    return declare(
        [ValidationTextBox],
        {
            templateString: template
        }
    );
});
