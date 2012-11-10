define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Stateful'
],
function(
    declare,
    lang,
    Stateful
){
    var status = declare
    (
        'Sds.Common.Status',
        [Stateful],
        {
            expired: undefined,

            message: undefined,

            icon: undefined,

            timeout: undefined,

            _timer: undefined,

            constructor: function(message, icon, timeout){

                this.set('expired', false);
                this.set('message', message);
                this.set('icon', icon);
                this.set('timeout', timeout);

                if (timeout){
                    this._timer = setTimeout(lang.hitch(this, function(){
                        this.set('expired', true);
                    }), this.timeout);
                }
            }
        }
    );

    status.icon = {
        SPINNER: 'spinner',
        HAPPY: 'happy',
        SUCCESS: 'success',
        ERROR: 'error'
    };

    return status;
});


