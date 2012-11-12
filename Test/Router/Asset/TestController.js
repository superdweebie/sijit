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
            test1: function(){
                dom.byId('test1Result').innerHTML = 'test1 called';
            },
            test2: function(a, b){
                dom.byId('test2Result').innerHTML = 'test2 called. arg a: ' + a + ', arg b: ' + b;
            },
            clear: function(){
                dom.byId('test1Result').innerHTML = 'cleared';
                dom.byId('test2Result').innerHTML = 'cleared';
            },
            ready: function(){
                dom.byId('test1Result').innerHTML = 'ready';
                dom.byId('test2Result').innerHTML = 'ready';
            }
        }
    );
});
