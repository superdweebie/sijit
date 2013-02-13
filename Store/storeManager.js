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

            var index = ref.lastIndexOf('/'),
                id = ref.substring(index + 1),
                name = ref.substring(0, index);

            return this.getStore(name).get(id);
        },

        getStore: function(name){
            // Function will return a store based on the store name.

            if ( ! this.stores){
                return;
            }

            for(var index in this.stores){
                if (this.stores[index].name == name){
                    return this.stores[index];
                }
            }
        }
    }
});
