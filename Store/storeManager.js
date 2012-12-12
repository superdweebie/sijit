define([], function(){
    // module:
    //		Sds/Store/storeManager
    // summary:
    //      Is a mega store that holds the stores for all the different
    //      registed data models.
    //

    return {

        stores: undefined,

        get: function(ref){
            // Will return an object based on the ref given

            var index = ref.lastIndexOf('/');
            var id = ref.substring(index + 1);
            var hint = ref.substring(0, index + 1);

            return this.getStore(hint).get(id);
        },

        getStore: function(hint){
            // Function will return a store based on the hint.
            // Hint may be one of three things, searched in order:
            //
            // 1. string matchin store.name
            // 2. object matching store.model
            // 3. string matching store.target

            if ( ! this.stores){
                return null;
            }

            var index;

            if (typeof hint == 'string'){
                for(index in this.stores){
                    if (this.stores[index].name == hint){
                        return this.stores[index];
                    }
                }
            }

            if (typeof hint == 'function'){
                for(index in this.stores){
                    if (this.stores[index].model == hint){
                        return this.stores[index];
                    }
                }
            }

            if (typeof hint == 'string'){
                for(index in this.stores){
                    if (this.stores[index].target == hint){
                        return this.stores[index];
                    }
                }
            }

            return null;
        }
    }
});
