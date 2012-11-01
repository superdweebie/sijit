define([
    'dojo/_base/declare'
],
function (
    declare
){
    // module:
    //		Sds/ModuleManager/Proxy

    return declare
    (
        'Sds/ModuleManager/Proxy',
        null,
        {
            // summary:
            //		A proxy to get or use an object.

            _identity: undefined,

            _moduleManager: undefined,

            constructor: function(identity, moduleManager){
                this._identity = identity;
                this._moduleManager = moduleManager;
            },

            moduleManagerGet: function(){
                return this._moduleManager.get(this._identity);
            }
        }
    )
});


