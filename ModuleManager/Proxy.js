define([
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (
    declare,
    lang
){
    // module:
    //		Sds/ModuleManager/Proxy

    return declare
    (
        [],
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
                var object = this._moduleManager.get(this._identity);
                lang.mixin(this, object);
                return object;
            }
        }
    )
});


