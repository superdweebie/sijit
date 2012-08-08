define([
        'doh/main',
        'sijit/errorController/ErrorDialog'
    ],
    function(
        doh,
        ErrorDialog
    ){


        doh.register("sijit.errorController.tests.ErrorDialog", [
            function configTest(doh){

                doh.assertTrue(1);
            }
        ]);
    }
);


