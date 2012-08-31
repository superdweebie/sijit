define([
    'dojo/_base/declare',
    'dojo/_base/Deferred',
    'dojo/Stateful',
    'Sds/ExceptionManager/throwEx',
    'Sds/ExceptionManager/Exception/InvalidTypeException'
],
function(
    declare,
    Deferred,
    Stateful,
    throwEx,
    InvalidTypeException
){
    // module:
    //		Sds/InputAgent/BaseInputAgent
    // summary:
    //		The module defines the base for an InputAgent.
    //      A input agent is like a classic form, just slightly higher level.
    //      A input agent has the task of collecting some kind of data, and returning
    //      it. The most important function is `activate` which tells the input
    //      agent to go to work.

    return declare(
        'Sds.InputAgent.BaseInputAgent',
        [Stateful],
        {
            // state: string
            //		Empty string if the form is valid. Otherwise, a string indicating state
            state: '',

            // value: object
            //		Is the form value object.
            //		An object with all the form values.
            value: undefined,

            // valueType: object
            //      Is the type of object that can be passed
            //      to the activate method, and the type of value object
            //      that will be returned from the activate method
            //      when it resolves
            valueType: undefined,

            _activateDeferred: undefined,

            activate: function(value){
                // summary:
                //		Makes the form visible/active
                // value: object
                //      Must be an instance of valueType
                // returns: Deferred
                //		A Deferred that resolves
                //		when the data collection is complete.
                //      The Deferred should deliver an object with the structure:
                //      {state: 'dataAgentState', value: 'dataAgentValueObject'}

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
                //		Resets/clears the data
                this.value = undefined;
            },

            _resolve: function(){
                var value = this.get('value');

                if (
                    ! value instanceof this.valueType && (
                    ! value.isInstanceOf ||
                    ! value.isInstanceOf(this.valueType)
                )){
                    throwEx(new InvalidTypeException('The return value of this InputAgent must be an instance of ' + this.valueType));
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
