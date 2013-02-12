define([
    'dojo/_base/declare',
    './Base'
],
function(
    declare,
    Base
){
    return declare(
        [Base],
        {

            _isValid: function(value){

                var result = true;
                this.haltOnPass = false;

                if (value === undefined || value === null || value == ''){
                    this.haltOnPass = true;
                }

                return {result: result, messages: []};
            }
        }
    );
});
