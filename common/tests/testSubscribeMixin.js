define([
        'doh/main',
        'sijit/common/SubscribeMixin'
    ],
    function(
        doh,
        SubscribeMixin
    ){


        doh.register("sijit.common.tests.SubscribeMixin", [
            function configTest(doh){

                doh.assertTrue(1);
            }
        ]);
    }
);


