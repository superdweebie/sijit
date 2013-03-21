define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/when',
    'dojo/dom-construct',
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
    on,
    when,
    domConstruct,
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

                var source = this.srcNodeRef;
                
                // Add options tags if not using store
                if (this.get('store')){
                    this._updateOptionsFromStore();
                } else {
                    if(source && source.options){
                        array.forEach(source.options, lang.hitch(this, function(option){
                            this.addOption(option.value, option.text);
                        }));
                    }
                }
                if (this.source){
                    this.set('value', source.value);
                }
            },

            startup: function(){
                this.inherited(arguments);
                on(this.select, 'change', lang.hitch(this, function(e){
                    this.set('value', e.target.value);
                }));
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
                        this.select.value = this.value;
                    }));
                }
            },

            addOption: function(value, label){
                var existingOptions = this.get('options');
                if ( ! existingOptions[value]){
                    if (this.sortByLabel){
                        var created = false;
                        array.forEach(this.select.options, lang.hitch(this, function(option){
                            if ( ! created && option.text > label){
                                domConstruct.create('option',{value: value, innerHTML: label}, option, 'before');
                                created = true;
                            }
                        }));
                        if ( ! created){
                            domConstruct.create('option',{value: value, innerHTML: label}, this.select, 'last');
                        }
                    } else {
                        domConstruct.create('option',{value: value, innerHTML: label}, this.select, 'last');
                    }
                }
            },

            removeOption: function(value){
                array.forEach(this.select.options, function(option){
                    if (option && option.value == value){
                        domConstruct.destroy(option);
                    }
                });
            },

            _setValueAttr: function(value){
                this.select.value = value;
                this.inherited(arguments);
            },

            _getValueAttr: function(){
                return this.select.value;
            },

            _setOptionsAttr: function(options){
                for (var value in options){
                    this.addOption(value, options[value]);
                }
            },

            _getOptionsAttr: function(){
                var options = {};
                array.forEach(this.select.options, lang.hitch(this, function(option){
                    options[option.value] = option.text;
                }));
                return options;
            },

            _setFocusNodeClassAttr: { node: "focusNode", type: "class" }
        }
    )
});
