define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/when',
    'dojo/dom-construct',
    'dijit/form/_FormValueMixin'
],
function (
    declare,
    lang,
    array,
    when,
    domConstruct,
    FormValueMixin
){
    return declare(
        'Sds/Common/Form/Select',
        [FormValueMixin],
        {
            // label: string
            label: undefined,

            // store: dojo/store/api/Store
            //		A store to use for getting our list of options - rather than reading them
            //		from the `<option>` html tags.
            store: undefined,

            // query: object
            //		A query to use when fetching items from our store
            query: undefined,

            // queryOptions: object
            //		Query options to use when fetching from the store
            queryOptions: undefined,

            // storeLabelAttr: string
            //		The entries in the drop down list come from this attribute in the dojo.store items.
            //		If ``store`` is set, labelAttr must be set too.
            storeLabelAttr: undefined,

            // sortByLabel: Boolean
            sortByLabel: true,

            _isBuilt: false,

            buildRendering: function(){
                this.inherited(arguments);

                // Add options tags if not using store
                if ( ! this.store){
                    var source = this.srcNodeRef;
                    if(source && source.options){
                        array.forEach(source.options, lang.hitch(this, function(option){
                            this.addOption(option.value, option.text);
                        }))
                    }
                }
                this.set('value', source.value);
                this._isBuilt = true;
            },

            _setStoreLabelAttrAttr: function(storeLabelAttr){
                this.storeLabelAttr = storeLabelAttr;
                this._updateOptionsFromStore();
            },

            _setStoreAttr: function(store){
                this.store = store;
                this._updateOptionsFromStore();
            },

            _setQueryAttr: function(query){
                this.query = query;
                this._updateOptionsFromStore();
            },

            _updateOptionsFromStore: function(){
                if (this._isBuilt && this.store && this.storeLabelAttr){
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
                            this.addOption(option[idProperty], option[this.storeLabelAttr]);
                        }));
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
                for (var index in this.select.options){
                    if (this.select.options[index].value == value){
                        domConstruct.destroy(this.select.options[index]);
                        break;
                    }
                }
            },

            _setValueAttr: function(value){
                this.select.value = value;
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

            _setLabelAttr: function(value) {
                this.label = value;

                if (this.label){
                    domConstruct.create(
                        'label',
                        {innerHTML: this.label, 'class': 'control-label', 'for': this.id},
                        this.domNode,
                        'first'
                    );
                }
            },

            _setFocusNodeClassAttr: { node: "focusNode", type: "class" }
        }
    )
});
