define([
    'dojo/_base/declare',
    './ValidationTextBox',
    'get!./captchaSrc',
    'dojo/text!./Template/Captcha.html'
],
function (
    declare,
    ValidationTextBox,
    captchaSrc,
    template
){
    return declare(
        'Sds/Form/Captcha',
        [ValidationTextBox],
        {
            templateString: template,

            imageSrc: captchaSrc.url,

            name: 'captcha',

            label: 'Code',

            placeholder: 'enter the code in the image'

        }
    );
});
