define([
        'doh/main',
        'sijit/errorController/ErrorController'
    ],
    function(
        doh,
        ErrorControler
    ){


        doh.register("sijit.errorController.tests.ErrorController", [
            function configTest(doh){

                doh.assertTrue(1);
            }
        ]);
    }
);


