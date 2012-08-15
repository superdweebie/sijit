define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojox/timing',
    'dojo/Stateful'
],
function(
    declare,
    lang,
    timing,
    Stateful
){
    var status = declare
    (
        'sijit.Common.Status',
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
                    this._timer = new timing.Timer(timeout);
                    this._timer.onTick = lang.hitch(this, function(){
                        this._timer.stop();
                        this.set('expired', true);
                    });
                    this._timer.start();
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


