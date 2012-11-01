define([
    'dojo/_base/declare'
],
function (
    declare
){
    // module:
    //		Sds/ServiceManager/Proxy

    return declare
    (
        'Sds/ServiceManager/Proxy',
        null,
        {
            // summary:
            //		A proxy to get or use an object.

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


