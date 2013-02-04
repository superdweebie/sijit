define([
    'dojo/Deferred'
],
function(
    Deferred
){
    return {

        name: 'Identity',

        get: function(id){
            var response = new Deferred;
            if (id == 'toby'){
                response.resolve({identityName: 'toby'});
            } else {
                response.resolve([]);
            }
            return response;
        }
    }
});


