define([
        'doh/main',
        'sijit/authController/LoginDialog'
    ],
    function(
        doh,
        LoginDialog
    ){


        doh.register("sijit.authController.tests.LoginDialog", [
            function configTest(doh){

                doh.assertTrue(1);
            }
        ]);
    }
);


