define ([
        'dojo/_base/declare',
        'Sds/ServiceManager/ServiceManagerAwareMixin',
        'Sds/ServiceManager/SafeGetPropertyMixin'
    ],
    function (
        declare,
        ServiceManagerAwareMixin,
        SafeGetPropertyMixin
    ){

        return declare (
            'Sds.Test.ServiceManager.Asset.Zoo',
            [ServiceManagerAwareMixin, SafeGetPropertyMixin],
            {
                name: 'the Sds zoo',
                lion: undefined,
                lion2: undefined,
                tiger: undefined
            }
        );
    }
);


