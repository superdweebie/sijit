define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/Deferred',
    'get!FilterFactory'
],
function (
    declare,
    lang,
    when,
    Deferred,
    FilterFactory
){

    return declare(
        [],
        {
            //_filterSet: false,

            // filter: an instance of Sds/Filter/Base.
            //filter: undefined,

            _setFilterAttr: function(value){
                // summary:
                //     Will set the filter. The value must be an instance of Base parameter may be one of three
                //     types:
                //
                //     Instance of Base - the filter property is set equal to this instance.
                //
                //     Array - if an array, it is assumed to be an array of filters, or filter definitions.
                //     The array will be passed to filterFactory.create(). The validator property
                //     will be set to the returned instance of FilterGroup
                //
                //     Object - an an object, it is assumbed to be a filter definition.
                //     The definition will be passed to filterFactory.create(). The filter property
                //     will be set to the returned instance of BaseValdiator
                //

                var filterDeferred = new Deferred;
                filterDeferred.then(lang.hitch(this, function(filter){
                    this.filter = filter;
                    this._filterSet = true;
                }));

                when(FilterFactory.create(value), function(filter){
                    filterDeferred.resolve(filter);
                });
            },

            applyFilter: function(value){

                if (! this._filterSet || ! this._started){
                    return value;
                }

                return this.filter.filter(value);
            }
        }
    );
});
