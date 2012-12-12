define([
    'dojo/_base/declare',
    'Sds/Mvc/BaseModel'
],
function(
    declare,
    BaseModel
){
    // Will return an object representing the document
    // which can be serialized to json.

    return declare(
        'Sds/Test/Mvc/Asset/Simple',
        [BaseModel],
        {

            _fields: [
                "id",
                "name",
                "child",
                "_className"
            ],
            _className: 'Sds\\Test\\Mvc\\Asset\\Simple'
        }
    );
});
