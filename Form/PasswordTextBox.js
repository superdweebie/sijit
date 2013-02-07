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
        'Sds/Form/PasswordTextBox',
        [ValidationTextBox],
        {
            templateString: template
        }
    );
});
