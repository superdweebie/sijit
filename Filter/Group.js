define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    '../is',
    './Base'
],
function(
    declare,
    lang,
    Deferred,
    is,
    Base
){
    return declare(
        [Base],
        {
            filters: [],

            filter: function(value){
                return this._loop(value, 0);
            },

            _loop: function(value, index){
                //Summary:
                //    loops over all the filters in turn.
                //    This code is slightly insane, but it works.
                //    Most of the instanity comes from handling the possibility
                //    that a filter may return a Deferred. If a Deferred is
                //    returned from one or more filters, then a Deferred will
                //    be returned from the Group
                //

                if (this.filters.length <= index){
                    return value;
                }

                var filter = this.filters[index],
                    filteredValue = this._getFilteredValue(filter, value);

                if (is.isDeferred(filteredValue)){

                    var resultDeferred = new Deferred;

                    filteredValue.then(lang.hitch(this, function(resolvedFilteredValue){
                        resultDeferred.resolve(this._loop(resolvedFilteredValue, index + 1));
                    }));

                    return resultDeferred;
                } else {
                    return this._loop(filteredValue, index + 1);
                }
            },

            _getFilteredValue: function(filter, value){
                return filter.filter(value);
            }
        }
    );
});
