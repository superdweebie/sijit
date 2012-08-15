define([
    'dojo/_base/declare'
],
function (
    declare
){
    // module:
    //		sijit/ServiceManager/Ref

    return declare
    (
        'sijit.ServiceManager.Ref',
        null,
        {
            // summary:
            //		A reference to get or use an object.

            _identity: undefined,

            _serviceManager: undefined,

            constructor: function(identity, serviceManager){
                this._identity = identity;
                this._serviceManager = serviceManager;
            },

            createObject: function(){
                return this._serviceManager.createObject(this._identity);
            },

            getObject: function(){
                return this._serviceManager.getObject(this._identity);
            }
        }
    )
});


