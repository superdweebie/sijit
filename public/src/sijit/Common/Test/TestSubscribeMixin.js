define([
        'doh/main',
        'sijit/Common/SubscribeMixin'
    ],
    function(
        doh,
        SubscribeMixin
    ){


        doh.register("sijit.Common.Test.TestSubscribeMixin", [
            function configTest(doh){

                doh.assertTrue(1);
            }
        ]);
    }
);


