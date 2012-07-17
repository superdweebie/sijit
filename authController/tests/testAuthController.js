define([
        'doh/main',
        'sijit/authController/AuthController'
    ],
    function(
        doh,
        AuthControler
    ){


        doh.register("sijit.authController.tests.AuthController", [
            function configTest(doh){

                doh.assertTrue(1);
            }
        ]);
    }
);


