define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'dojo/Stateful',
    'Sds/ExceptionModule/throwEx',
    'Sds/ExceptionModule/Exception/InvalidTypeException'
],
function(
    declare,
    Deferred,
    Stateful,
    throwEx,
    InvalidTypeException
){
    // module:
    //		Sds/View/BaseView
    // summary:
    //		The module defines the base for an View.
    //      A view is responsible for showing and hiding parts of the ui.
    //      A view may also be responsible for displaying or collecting data.
    //      The form of data to be displayed or collected should normally be 
    //      defined by a ViewModel.

    return declare(
        'Sds.View.BaseView',
        [Stateful],
        {
            // state: string
            //      Indicates if the view has a valid value.
            //		Empty string if the value is valid. Otherwise, a string indicating invalid
            //      value. Invalid string is norammly 'Incomplete', or 'Error'
            state: '',

            // value: object
            //		Is the view value object. This is normally a viewModel.
            value: undefined,

            // valueType: object
            //      Is the type of object that can be passed
            //      to the activate method, and the type of value object
            //      that will be returned from the activate method
            //      when it resolves. Normally a ViewModel definition.
            valueType: undefined,

            _activateDeferred: undefined,

            activate: function(value){
                // summary:
                //		Makes the view visible/active
                // value: object
                //      Optional. Must be an instance of this.valueType.
                // returns: Deferred
                //		A Deferred that resolves
                //		when the view is hidden.
                //      The Deferred should deliver an object with the structure:
                //      {state: this.state, value: this.value}

                this._activateDeferred = new Deferred;

                if (value) {
                    if (! value instanceof this.valueType && (
                            ! value.isInstanceOf ||
                            ! value.isInstanceOf(this.valueType)
                        )
                    ){
                        throwEx(new InvalidTypeException());
                        this._activateDeferred.reject();
                        return this._activateDeferred;
                    }
                    this.set('value', value);
                }

                return this._activateDeferred;
            },

            reset: function(){
                // summary:
                //		Resets/clears the view value
                this.value = undefined;
            },

            _resolve: function(){
                var value = this.get('value');

                if (
                    ! value instanceof this.valueType && (
                    ! value.isInstanceOf ||
                    ! value.isInstanceOf(this.valueType)
                )){
                    throwEx(new InvalidTypeException('The return value of this View must be an instance of ' + this.valueType));
                    this._activateDeferred.reject();
                    return;
                }
                this._activateDeferred.resolve({
                    state: this.get('state'),
                    value: value
                });
            }
        }
    );
});
