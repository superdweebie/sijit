define([
        'doh/main',
        'dijit/registry',
        'sijit/Bootstrap/Bootstrap'
    ],
    function(
        doh,
        registry,
        Bootstrap
    ){

        doh.register("sijit.Test.Bootstrap", [
            function bootstrapTest(doh){
                var bootstrap = new Bootstrap({id: 'testBootstrap'});

                doh.assertEqual(registry.byId('testBootstrap'), bootstrap);
            }

        ]);
    }
);


