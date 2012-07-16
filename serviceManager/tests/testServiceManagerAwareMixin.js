define([
        'doh/main',
        'sijit/service/ServiceManagerAwareMixin',
        'sijit/service/ServiceManager'
    ],
    function(
        doh,
        ServiceManagerAwareMixin,
        ServiceManager
    ){

        doh.register("sijit.tests.ServiceManagerAwareMixin", [
            function serviceManagerAwareMixinTest(doh){
                var serviceManagerAwareMixin = new ServiceManagerAwareMixin();

                doh.assertTrue(serviceManagerAwareMixin.serviceManager() instanceof ServiceManager);
            }
        ]);
    }
);


