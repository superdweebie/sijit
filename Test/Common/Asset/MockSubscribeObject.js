define([
    'dojo/_base/declare',
    'Sds/Common/SubscribeMixin'
],
function(
    declare,
    SubscribeMixin
){
    return declare(
        'Sds.Test.Common.Asset.MockSubscribeObject',
        [SubscribeMixin],
        {
            message: undefined,

            messageListener: function(message){
                this.message = message;
            }
        }
    );
});


