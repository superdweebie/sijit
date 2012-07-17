define([
        'doh/main',
        'sijit/authController/RecoverPasswordDialog'
    ],
    function(
        doh,
        RecoverPasswordDialog
    ){


        doh.register("sijit.authController.tests.RecoverPasswordDialog", [
            function configTest(doh){

                doh.assertTrue(1);
            }
        ]);
    }
);


