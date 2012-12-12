define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'dojo/when',
    'dojo/Stateful',
    'get!Sds/Store/storeManager'
],
function(
    declare,
    Deferred,
    when,
    Stateful,
    storeManager
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

            get: function(/*String*/name){

                var value = this.inherited(arguments);
                if ( ! value['$ref']){
                    return value;
                }

                //the value is a reference, so load it
                var valueDeferred = new Deferred;
                when(storeManager.get(value['$ref']), function(resolvedValue){
                    valueDeferred.resolve(resolvedValue);
                });
                return valueDeferred;
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
