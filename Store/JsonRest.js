define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/xhr',
    'dojo/store/JsonRest'
],
function(
    declare,
    lang,
    xhr,
    JsonRest
){
    return declare (
        'Sds/Store/JsonRest',
        [JsonRest],
        {
            // summary:
            //     A standard dojo/store/JsonRest store with a few
            //     tweaks to make it work better with zf2 services

            '-chains-': {
                //Turn off constructor chaining so headers don't get wiped
                constructor: "manual"
            },

            // headers: Object
            //		Additional headers to pass in all requests to the server. These can be overridden
            //		by passing additional headers to calls to the store.
            headers: {
                Accept: 'application/json'
            },

            constructor: function(options){
                // summary:
                //		This is a basic store for RESTful communicating with a server through JSON
                //		formatted data.
                // options: dojo/store/JsonRest
                //		This provides any configuration information that will be mixed into the store
                declare.safeMixin(this, options);
            },

            remove: function(id, options){
                // summary:
                //		Deletes an object by its identity. This will trigger a DELETE request to the server.
                // id: Number
                //		The identity to use to delete the object
                // options: __HeaderOptions?
                //		HTTP headers.
                options = options || {};
                return xhr("DELETE", {
                    url: this.target + id,
                    handleAs: "json",
                    headers: lang.mixin({}, this.headers, options.headers)
                });
            }
        }
    );
});