define([
    'dojo/_base/declare',
    'dojo/Stateful'
],
function(
    declare,
    Stateful
){
    // module:
    //		Sds/Mvc/BaseModel
    // summary:
    //		The module defines the base for a Model.
    //		You don't need to use this module for models, but
    //		it does add some helpful convenience, particularly the toJSON function

    return declare(
        'Sds/Mvc/BaseModel',
        [Stateful],
        {
            
            _fields: undefined,
            
            _fieldsSetter: function(/*array*/value){
                if ( ! this._fields){
                    this._fields = [];
                }
                this._fields = this._fields.concat(value);
            },
            
            toJSON: function(){
                var json = {};
                var value;
                for(var index in this._fields){
                    value = this.get(this._fields[index]);
                    if (value != undefined) {
                        json[this._fields[index]] = value;
                    }                       
                }
                return json;
            }
        }
    );
});
