define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'dojo/when'
],
function(
    declare,
    Deferred,
    when
){
    // module:
    //		Sds/Mvc/ModelStore
    // summary:
    //      Is a mega store that holds the stores for all the different
    //      registed data models.
    //


    return declare(
        'Sds/Mvc/ModelStore',
        [],
        {

            stores: undefined,


            get: function(id){

            },

            getStore: function(target){

            }
        }
    );
});
