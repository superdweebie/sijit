define([
    'dojo/_base/declare',
    'dojo/dom-class',
    'dojo/date/locale',
    './Dropdown',
    'dojo/text!./Template/DateDropdown.html'
],
function (
    declare,
    domClass,
    dateLocale,
    Dropdown,
    template
){
    // module:
    //    	Sds/Widget/DateDropdown

    return declare(
        [Dropdown],
        {
            templateString: template,

            //openTo: undefined,

            _mode: 'Day', //Day | Month | Year

            startup: function(){
                this.inherited(arguments);

                //Populate the days of the week
                var html = [],
                    i;
                for (i = 0; i < 7; i++){
                    html.push('<th class="dow">' + dateLocale._parseInfo().bundle['days-format-short'][i] + '</th>');
                }
                this.dow.innerHTML = html.join('\n');
            },

            _getValueAttr: function(){
                if (!this.value){
                    var today = new Date();
                    today.setHours(0,0,0,0);
                    this._set('value', today);
                }
                return this.value;
            },

            _show: function(){
                this.opening = true; //this is a hook for Sds/Form/DateTextBox:onBlur to delay postActivity
                this._mode = 'Day';
                this.openTo = new Date(this.get('value').getTime());

                this._fill();
                this.inherited(arguments);
                delete(this.opening);
            },

            onPrev: function(e){
                if (this._mode == 'Day'){
                    this.openTo.setMonth(this.openTo.getMonth() - 1);
                } else if (this._mode == 'Month'){
                    this.openTo.setFullYear(this.openTo.getFullYear() - 1);
                } else {
                    this.openTo.setFullYear(this.openTo.getFullYear() - 10);
                }
                this._fill();
            },

            onNext: function(e){
                if (this._mode == 'Day'){
                    this.openTo.setMonth(this.openTo.getMonth() + 1);
                } else if (this._mode == 'Month'){
                    this.openTo.setFullYear(this.openTo.getFullYear() + 1);
                } else {
                    this.openTo.setFullYear(this.openTo.getFullYear() + 10);
                }
                this._fill();
            },

            onSelect: function(e){
                if (domClass.contains(e.target, 'month')){
                    this.openTo.setMonth(dateLocale.parse(e.target.innerHTML, {selector: 'date', datePattern: 'MMM'}).getMonth());
                    this._mode = 'Day';
                    this._fill();
                } else if (domClass.contains(e.target, 'year')){
                    this.openTo.setFullYear(e.target.innerHTML);
                    this._mode = 'Month';
                    this._fill();
                } else {
                    if (domClass.contains(e.target, 'old')){
                        this.openTo.setMonth(this.openTo.getMonth() - 1);
                    }
                    if (domClass.contains(e.target, 'new')){
                        this.openTo.setMonth(this.openTo.getMonth() + 1);
                    }
                    this.openTo.setDate(e.target.innerHTML);
                    this.set('value', this.openTo);
                    this.hide();
                }
            },

            onHeader: function(e){
                if (this._mode == 'Day'){
                    this._mode = 'Month';
                } else if (this._mode == 'Month'){
                    this._mode = 'Year';
                }
                this._fill();
            },

            _fill: function() {
                this['_fill' + this._mode]();
            },

            _fillDay: function(){
                var clsName,
                    month = this.openTo.getMonth(),
                    year = this.openTo.getFullYear(),
                    html,
                    value = this.get('value'),
                    startDay = new Date(year, month, 0, 0,0,0,0),
                    endDay = new Date(year, month + 1, 1, 0,0,0,0);

                if (startDay.getDay() == 6){
                    startDay.setDate(1);
                    startDay.setMonth(month);
                } else {
                    startDay.setDate(startDay.getDate() - startDay.getDay());
                }

                if (endDay.getDay() == 0){
                    endDay.setDate(0);
                } else {
                    endDay.setDate(7 - endDay.getDay());
                }

                //Fill the header
                this.header.innerHTML = dateLocale.format(new Date(year, month, 1), {selector: 'date', datePattern: 'MMMM yyyy'});

                //Show the days of the week
                domClass.remove(this.dow, 'hide');

                //Fill the days of the month
                html = [];
                while(startDay.valueOf() <= endDay.valueOf()) {
                    if (startDay.getDay() === 0) {
                        html.push('<tr>');
                    }
                    clsName = '';
                    if (startDay.getMonth() < month) {
                        clsName += ' old';
                    } else if (startDay.getMonth() > month) {
                        clsName += ' new';
                    }
                    if (startDay.valueOf() == value.valueOf()) {
                        clsName += ' active';
                    }
                    html.push('<td class="day'+clsName+'">'+startDay.getDate() + '</td>');
                    if (startDay.getDay() === 6) {
                        html.push('</tr>');
                    }
                    startDay.setDate(startDay.getDate()+1);
                }
                this.body.innerHTML = html.join('\n');
            },

            _fillMonth: function(){

                var i,
                    clsName,
                    month = this.openTo.getMonth(),
                    year = this.openTo.getFullYear(),
                    html,
                    value = this.get('value');

                //Fill the header
                this.header.innerHTML = dateLocale.format(new Date(year, month, 1), {selector: 'date', datePattern: 'yyyy'});

                //Hide days of week
                domClass.add(this.dow, 'hide');

                //Fill the months of the year
                html = ['<tr><td colspan="7">'];
                for (i = 0; i < 12; i++){
                    clsName = 'month';
                    if (i == value.getMonth()){
                        clsName += ' active';
                    }
                    html.push('<span class="' + clsName + '">' + dateLocale._parseInfo().bundle['months-format-abbr'][i] + '</span>');
                }
                html.push('</td></tr>');
                this.body.innerHTML = html.join('\n');
            },

            _fillYear: function(){

                var i,
                    clsName,
                    year = this.openTo.getFullYear(),
                    html,
                    value = this.get('value');

                //Fill the header
                this.header.innerHTML = '';

                //Hide days of week
                domClass.add(this.dow, 'hide');

                //Fill the years
                html = ['<tr><td colspan="7"><span class="year old">'  + (year - 6) + '</span>'];
                for (i = year - 5; i < year + 5; i++){
                    clsName = 'year';
                    if (i == value.getFullYear()){
                        clsName += ' active';
                    }
                    html.push('<span class="' + clsName + '">' + i + '</span>');
                }
                html.push('<span class="year old">'  + (year + 6) + '</span></td></tr>');
                this.body.innerHTML = html.join('\n');
            }
        }
    );
});
