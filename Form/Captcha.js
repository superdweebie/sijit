define([
    'dojo/_base/declare',
    'Sds/Form/ValidationTextBox',
    'get!Sds/Form/captchaSrc',
    'dojo/text!./Template/Captcha.html'
],
function (
    declare,
    ValidationTextBox,
    captchaSrc,
    template
){
    return declare(
        'Sds/Form/PasswordTextBox',
        [ValidationTextBox],
        {
            templateString: template,

            imageSrc: captchaSrc,

            name: 'captcha',

            label: 'Code',

            placeholder: 'enter the code in the image'

        }
    );
});
