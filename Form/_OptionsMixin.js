define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/Deferred',
    'dojo/when',
    'dojo/store/Memory',
    './_LabelMixin',
    './_HelpMessagesMixin',
    'dijit/form/_FormValueMixin',
    './_RequiredStarMixin',
    'get!../Store/storeManager'
],
function (
    declare,
    lang,
    array,
    Deferred,
    when,
    Memory,
    LabelMixin,
    HelpMessagesMixin,
    FormValueMixin,
    RequiredStarMixin,
    storeManager
){
    return declare(
        [LabelMixin, HelpMessagesMixin, FormValueMixin, RequiredStarMixin],
        {
            // store: dojo/store/api/Store
            //    	A store to use for getting our list of options - rather than reading them
            //		from the `<option>` html tags.

            // query: object
            //		A query to use when fetching items from our store

            // queryOptions: object
            //		Query options to use when fetching from the store

            // storeLabel: string
            //		The entries in the drop down list come from this attribute in the dojo.store items.
            //		If ``store`` is set, storeLabel must be set too.
            storeLabel: 'label',

            // sortByLabel: Boolean
            sortByLabel: true,

            //_currentOptions: [],

            //addOption: function(value, label){
                //override
            //},

            //removeOption: function(value){
                //override
            //},

            buildRendering: function(){

                this._currentOptions = {};

                this.inherited(arguments);

                if ( !this.value && this.source){
                    this.value = this.srcNodeRef.value;
                }

                if ( !this.get('store')){
                    if (this.srcNodeRef && this.srcNodeRef.options) {
                        //store doesn't exist, so create it from the options inside srcNode
                        this.store = new Memory({data: array.map(this.srcNodeRef.options, lang.hitch(this, function(option){
                            if (option.selected){
                                this.value = option.value;
                            }
                            return {id: option.value, label: option.text};
                        }))});
                    } else {
                        this.store = new Memory;
                    }
                }
            },

            _getStoreAttr: function(){
                if (this.store && typeof this.store == 'string'){
                    //get store from storeManager
                    this.store = storeManager.getStore(this.store);
                }

                return this.store;
            },

            updateOptions: function(){

                var doneDeferred = new Deferred;
                when(this.store.query(this.query, this.queryOptions), lang.hitch(this, function(data){

                    var i,
                        newOptions = {},
                        oldOptions = this._currentOptions,
                        idProperty = this.store.idProperty,
                        storeLabel = this.storeLabel;

                    array.forEach(data, function(option){
                        newOptions[option[idProperty]] = option[storeLabel];
                    });

                    for (i in oldOptions){
                        if (!newOptions[i]){
                            this.removeOption(i, oldOptions[i]);
                        }
                    }
                    for (i in newOptions){
                        if (!oldOptions[i]){
                            this.addOption(i, newOptions[i]);
                        }
                    }

                    this._currentOptions = newOptions;

                    //reset value once items have been added. This allows Ajax values to be returned before setting the select value
                    this.set('value', this.value);

                    doneDeferred.resolve();
                }));

                return doneDeferred;
            },

            _setOptionsAttr: function(options){
                var data = [],
                    value;
                for (value in options){
                    data.push({id: value, label: options[value]});
                }
                this.set('store', new Memory({data: data}));
            },

            _getOptionsAttr: function(){
                return this._currentOptions;
            }
        }
    )
});
