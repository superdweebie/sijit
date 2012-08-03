define ([
        'dojo/_base/declare',
        'sijit/ServiceManager/ServiceManagerAwareMixin',
        'sijit/ServiceManager/SafeGetPropertyMixin'
    ],
    function (
        declare,
        ServiceManagerAwareMixin,
        SafeGetPropertyMixin
    ){

        return declare (
            'sijit.ServiceManager.Test.Asset.Zoo',
            [ServiceManagerAwareMixin, SafeGetPropertyMixin],
            {
                name: 'the sijit zoo',
                lion: undefined,
                lion2: undefined,
                tiger: undefined
            }
        );
    }
);


