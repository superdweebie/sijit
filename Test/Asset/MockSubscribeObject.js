define([
    'dojo/_base/declare',
    'Sds/SubscribeMixin'
],
function(
    declare,
    SubscribeMixin
){
    return declare(
        [SubscribeMixin],
        {
            message: undefined,

            messageListener: function(message){
                this.message = message;
            }
        }
    );
});


