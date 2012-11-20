define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/Stateful'
],
function(
    declare,
    lang,
    Deferred,
    Stateful
){
    // module:
    //		Sds/Mvc/BaseView
    // summary:
    //		The module defines the base for an View.
    //      A view is responsible for showing and hiding parts of the ui.
    //      A view may also be responsible for displaying or collecting data.

    return declare(
        'Sds/Mvc/BaseView',
        [Stateful],
        {
            // state: string
            //      Indicates if the view has a valid value.
            //		Empty string if the value is valid. Otherwise, a string indicating invalid
            //      value. Invalid string is norammly 'Incomplete', or 'Error'
            state: '',

            // value: object
            //		Is the view value object.
            value: undefined,

            // _activateDeferred: promise
            //      This is the promise that is returned from the activate function.
            //      This promise may emit progress data.
            //      It will resove when the activeation is complete (normally when the
            //      view is closed/hidden)
            _activateDeferred: undefined,

            activate: function(value){
                // summary:
                //		Makes the view visible/active
                // value: object
                //      Optional.
                // returns: Deferred
                //		A Deferred that resolves
                //		when the view is deactivated.
                //      The Deferred should deliver an object with the structure:
                //      {state: this.state, value: this.value}

                this._activateDeferred = new Deferred;

                this.set('value', value);

                return this._activateDeferred;
            },

            isAcive: function(){
                // summary:
                //    Returns a boolean to indicate if the view is active.

                return ! this._activateDeferred.isResolved();
            },

            deactivate: function(){
                // summary:
                //     Tell the view to close/hide/stop doing whatever it does.
                //     Should be overridden by implementing module.
                this._resolve();
            },

            _getResolveMixin: function(){
                // summary:
                //      This method can be overridden.
                //      It must return an object that will be mixed in to resolve return value
            },

            _resolve: function(){
                // summary:
                //     Resolved the _activateDeferred promise
                //     This method should be called by modules which inherit from this base

                this._activateDeferred.resolve(lang.mixin(
                    {
                        state: this.get('state'),
                        value: this.get('value')
                    },
                    this._getResolveMixin()
                ));
            }
        }
    );
});
