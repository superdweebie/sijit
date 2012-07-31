define ([
        'dojo/_base/declare',
        'sijit/ServiceManager/ServiceManagerAwareMixin'
    ],
    function (
        declare,
        ServiceManagerAwareMixin
    ){

        return declare (
            'sijit.ServiceManager.Test.Asset.Zoo',
            [ServiceManagerAwareMixin],
            {
                name: 'the sijit zoo',
                lion: undefined,
                lion2: undefined,
                tiger: undefined
            }
        );
    }
);


