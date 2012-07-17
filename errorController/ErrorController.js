define
(
    [
        'dojo/_base/declare',
        'dojo/_base/json',
        'dojo/_base/lang',
        'dojo/_base/Deferred'
    ],
    function
    (
        declare,
        json,
        lang,
        Deferred
    )
    {
        return declare
        (
            'sijit.errorController.ErrorController',
            null,
            {
                status: undefined,
                errorDialog: undefined,
                handle: function(error)
                {
                    console.dir(error);
                    var message = error.message;
                    if (error.responseText)
                    {
                        var response = json.fromJson(error.responseText);
                        if (response.message)
                        {
                            message = response.message;
                        }
                        if (response.exception)
                        {
                            if (response.exception.message)
                            {
                                message = response.exception.message;
                            }
                        }
                    }
                    this._deferredReturn = new Deferred;
                    this.showErrorDialog(message);
                },
                showErrorDialog: function(message){
                    if (typeof this.errorDialog == 'string'){
                        this.errorDialog.use(lang.hitch(this, function(errorDialog){
                            this.errorDialog = errorDialog;
                            this.showErrorDialog(message);
                        }));
                        return;
                    }

                    this.errorDialog.set('message', message);
                    Deferred.when(this.status.set(
                        'status',
                        {message: 'error', icon: 'error'}
                    ));
                    Deferred.when(this.errorDialog.show(), lang.hitch(this, function()
                        {
                            Deferred.when(this.status.set(
                                'status',
                                {}
                            ));
                            delete this.errorDialog;
                            this._deferredReturn.resolve();
                        }
                    ));
                    return this._deferredReturn;
                }
            }
        );
    }
);