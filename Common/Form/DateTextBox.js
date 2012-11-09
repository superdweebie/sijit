define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/date/locale',
    'Sds/Common/Form/ValidationTextBox',
    'bootstrap/Datepicker'
],
function (
    declare,
    lang,
    on,
    dateLocale,
    ValidationTextBox,
    Datepicker
){
    return declare(
        'Sds/Common/Form/DateTextBox',
        [ValidationTextBox],
        {
            placeholder: {format: ''},

            formatLength: 'short',

            _datepicker: undefined,

            _datepickerHidden: true,

            // there is no typing for this input, so the delay timer can be removed
            // to make it feel more snappy
            delayTimeout: 0,

            postCreate: function(){
                this.inherited(arguments);
                this._datepicker = new Datepicker(this.textbox, {format: dateLocale._parseInfo().bundle['dateFormat-' + this.formatLength]});
                this._datepicker.setValue = lang.hitch(this, function(){
                    this.set('value', dateLocale.format(this._datepicker.date, {selector: 'date', formatLength: this.formatLength}));
                });
                on(this.domNode, 'show', lang.hitch(this, function(){
                    this._datepickerHidden = false;
                }));
                on(this.domNode, 'hide', lang.hitch(this, function(){
                    this._datepickerHidden = true;
                }));
            },

            onFocus: function(){
                this._datepicker.show();
                this.inherited(arguments);
            },

            onBlur: function(){
                //block blur if the date picker is open - it's not really a propert blur event
                if ( ! this._datepickerHidden){
                    return;
                }
                this.inherited(arguments);
            },

            _setPlaceholderAttr: function(value){
                if (value.hasOwnProperty('format')){
                    value = dateLocale._parseInfo().bundle['dateFormat-' + this.formatLength];
                }
                this.inherited(arguments, [value]);
            },

            parse: function(value, constraints){
                return dateLocale.parse(value, lang.mixin({selector: 'date', formatLength: this.formatLength}, constraints));
            }
        }
    );
});
