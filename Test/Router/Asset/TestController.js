define([
    'dojo/_base/declare',
    'dojo/dom'
],
function(
    declare,
    dom
){
    return declare(
        'Sds/Test/Router/Asset/TestController',
        [],
        {
            test1Action: function(){
                dom.byId('test1ActionResult').innerHTML = 'test1Action called';
            },
            test2Action: function(a, b){
                dom.byId('test2ActionResult').innerHTML = 'test2Action called. arg a: ' + a + ', arg b: ' + b;
            }
        }
    );
});
