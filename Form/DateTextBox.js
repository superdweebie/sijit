define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/window',    
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/on',
    'dojo/date/locale',
    './ValidationTextBox',
    'bootstrap/Datepicker'
],
function (
    declare,
    lang,
    win,
    domConstruct,
    domStyle,
    on,
    dateLocale,
    ValidationTextBox,
    Datepicker
){
    return declare(
        [ValidationTextBox],
        {
            placeholder: {format: ''},

            formatLength: 'short',

            //_datepicker: undefined,

            // there is no typing for this input, so the delay timer can be removed
            // to make it feel more snappy
            delayTimeout: 0,

            postCreate: function(){
                this.inherited(arguments);
                this._datepicker = new Datepicker(this.textbox, {format: dateLocale._parseInfo().bundle['dateFormat-' + this.formatLength]});
                //append to body to avoid relative parent containers
                domConstruct.place(this._datepicker.picker, win.body());
                domStyle.set(this._datepicker.picker, {
                    zIndex:9999
                });
                this._datepicker.setValue = lang.hitch(this, function(){
                    this.set('value', dateLocale.format(this._datepicker.date, {selector: 'date', formatLength: this.formatLength}));
                });
                on(this.domNode, 'click', function(e){
                    //if allowed to propogate, it will hide the datepicker
                    e.stopPropagation();
                });
            },

            onFocus: function(){
                this._datepicker.show();
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