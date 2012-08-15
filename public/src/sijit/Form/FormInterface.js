define([
    'dojo/_base/declare',
    'dojo/Stateful'
],
function(
    declare,
    Stateful
){
    // module:
    //		sijit/Form/FormInterface
    // summary:
    //		The module defines the interface for a form.

    return declare(
        'sijit.Form.FormInterface',
        [Stateful],
        {
            // state: string
            //		Empty string if the form is valid. Otherwise, a string indicating state
            state: '',

            // value: object
            //		Is the form value object.
            //		An object with all the form values.
            value: {},

            activate: function(){
                // summary:
                //		Makes the form visible/active
                // returns: Deferred
                //		A Deferred that resolves
                //		when the form is complete/submitted.
                //      The Deferred should deliver an object with the structure:
                //      {state: 'formState', value: 'formValueObject'}
            },

            reset: function(){
                // summary:
                //		Resets/clears the form
            }
        }
    );
});
