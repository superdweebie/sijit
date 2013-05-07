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
            //active: undefined,

            test1: function(){
                this.active = 'test1';
                dom.byId('test1').innerHTML = 'test1 called';
                dom.byId('test2').innerHTML = '';
            },
            test2: function(a, b){
                this.active = 'test2';
                dom.byId('test2').innerHTML = 'test2 called. arg a: ' + a + ', arg b: ' + b;
                dom.byId('test1').innerHTML = '';
            },
            exit: function(){
                dom.byId('exit').innerHTML = 'exited from ' + this.active;
            },
            altExit: function(){
                dom.byId('exit').innerHTML = 'Atl exit from ' + this.active;
            },
            clear: function(){
                this.active = 'clear';
                dom.byId('test1').innerHTML = '';
                dom.byId('test2').innerHTML = '';
            },
            ready: function(){
                this.active = 'ready';
                dom.byId('test1').innerHTML = 'ready';
                dom.byId('test2').innerHTML = 'ready';
            }
        }
    );
});
