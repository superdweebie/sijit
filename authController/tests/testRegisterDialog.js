define([
        'doh/main',
        'sijit/authController/RegisterDialog'
    ],
    function(
        doh,
        RegisterDialog
    ){


        doh.register("sijit.authController.tests.RegisterDialog", [
            function configTest(doh){

                doh.assertTrue(1);
            }
        ]);
    }
);


