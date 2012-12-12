// This code generated by Sds\DoctrineExtensions\Dojo
define([
    'dojo/_base/declare',
    'Sds/Mvc/BaseModelJsonRestStore',
    'Sds/Test/Mvc/Asset/Simple'
],
function(
    declare,
    BaseModelJsonRestStore,
    Simple
){
    // Will return dojo object store to manage server model
    // instances with a json rest api.

    return declare(
        'Sds/Test/Mvc/Asset/JsonRestStore',
        [BaseModelJsonRestStore],
        {

            idProperty: 'id',

            target: 'http:://myserver.com/Simple/',

            model: Simple
        }
    );
});