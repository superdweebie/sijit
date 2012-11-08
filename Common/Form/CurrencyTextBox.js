define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Common/Form/_TextBoxMixin',
    'Sds/Common/Form/_AppendageMixin',
    'dojo/text!./Template/TextBox.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    TextBoxMixin,
    AppendageMixin,
    template
){
    return declare(
        'Sds/Common/Form/CurrencyTextBox',
        [Widget, TemplatedMixin, TextBoxMixin, AppendageMixin],
        {
            templateString: template,

            placeholder: '0.00',

            prepend: ['$'],

            format: function(value /*=====, constraints =====*/){
                return value == null ? '' : (value.toString ? value.toString() : value);
            },

            parse: function(value /*=====, constraints =====*/){
                return value;	// String
            }
        }
    );
});
