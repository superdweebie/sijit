define([
        'doh/main',
        'dijit/registry',
        'sijit/bootstrap/Bootstrap'
    ],
    function(
        doh,
        registry,
        Bootstrap
    ){

        doh.register("sijit.tests.Bootstrap", [
            function bootstrapTest(doh){
                var bootstrap = new Bootstrap({id: 'testBootstrap'});

                doh.assertEqual(registry.byId('testBootstrap'), bootstrap);
            }
        ]);
    }
);


