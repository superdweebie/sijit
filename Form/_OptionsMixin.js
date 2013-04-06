define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/when',
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
    when,
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
            //		A store to use for getting our list of options - rather than reading them
            //		from the `<option>` html tags.

            // query: object
            //		A query to use when fetching items from our store

            // queryOptions: object
            //		Query options to use when fetching from the store

            // storeLabel: string
            //		The entries in the drop down list come from this attribute in the dojo.store items.
            //		If ``store`` is set, labelAttr must be set too.

            // sortByLabel: Boolean
            sortByLabel: true,

            buildRendering: function(){
                this.inherited(arguments);
                              
                // Add options tags if not using store
                if (this.get('store')){
                    this._updateOptionsFromStore();
                } else {
                    var source = this.srcNodeRef;                    
                    if(source && source.options){
                        array.forEach(source.options, lang.hitch(this, function(option){
                            this.addOption(option.value, option.text);
                        }));
                        if ( !this.value){
                            this.set('value', source.value);                        
                        }
                    }
                }
            },

            _setStoreLabelAttr: function(storeLabel){
                this.storeLabel = storeLabel;
                this._updateOptionsFromStore();
            },

            _setStoreAttr: function(store){
                this.store = store;
                this._updateOptionsFromStore();
            },

            _getStoreAttr: function(){
                if (this.store && typeof this.store == 'string'){
                    //get store from storeManager
                    this.store = storeManager.getStore(this.store);
                }

                return this.store;
            },

            _setQueryAttr: function(query){
                this.query = query;
                this._updateOptionsFromStore();
            },

            _updateOptionsFromStore: function(){
                if (this.store && this.storeLabel){
                    when(this.store.query(this.query, this.queryOptions), lang.hitch(this, function(data){
                        var existingOptions = this.get('options');
                        var idProperty = this.store.idProperty;

                        var addOptions = data.filter(function(option){
                            if (existingOptions[option[idProperty]]){
                                return false;
                            } else {
                                return true;
                            }
                        });

                        var removeOptions = lang.clone(existingOptions);
                        data.forEach(function(option){
                            if (existingOptions[option[idProperty]]){
                                delete removeOptions[option[idProperty]];
                            }
                        });

                        for (var index in removeOptions){
                            this.removeOption(index);
                        }

                        array.forEach(addOptions, lang.hitch(this, function(option){
                            this.addOption(option[idProperty], option[this.storeLabel]);
                        }));
                        //reset value once items have been added. This allows Ajax values to be returned before setting the select value
                        this.set('value', this.value);
                    }));
                }
            },

            //addOption: function(value, label){
                //override
            //},

            //removeOption: function(value){
                //override
            //},

            _setOptionsAttr: function(options){
                for (var value in options){
                    this.addOption(value, options[value]);
                }
            },

            //_getOptionsAttr: function(){
                //overide
            //},

            _setFocusNodeClassAttr: { node: "focusNode", type: "class" }
        }
    )
});
