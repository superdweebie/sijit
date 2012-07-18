define([
        'doh/main',
        'sijit/serviceManager/ServiceManagerAwareMixin',
        'sijit/serviceManager/ServiceManager'
    ],
    function(
        doh,
        ServiceManagerAwareMixin,
        ServiceManager
    ){

        doh.register("sijit.serviceManager.tests.ServiceManagerAwareMixin", [
            function serviceManagerAwareMixinTest(doh){
                var serviceManagerAwareMixin = new ServiceManagerAwareMixin();

                doh.assertTrue(serviceManagerAwareMixin.serviceManager() instanceof ServiceManager);
            }
        ]);
    }
);


