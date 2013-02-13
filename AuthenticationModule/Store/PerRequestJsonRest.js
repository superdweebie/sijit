define([
    'dojo/_base/declare',
    'dojox/encoding/base64',
    '../Store/JsonRest'
],
function(
    declare,
    base64,
    JsonRest
){
    return declare (
        [JsonRest],
        {

            constructor: function(options){
                // summary:
                //    store that will consume an identity object and send an Authorization header

                if ('identity' in options){
                    if (! 'headers' in options){
                        options.headers = {};
                    }
                    options.headers.authorization = 'Basic ' + base64.encode(
                        options.identity.identityName + ':' + options.identity.credential
                    );
                    delete options.identity;
                }

                declare.safeMixin(this, options);
            }
        }
    );
});