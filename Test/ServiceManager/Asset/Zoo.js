define ([
        'dojo/_base/declare',
        'Sds/ServiceManager/ServiceManagerAwareMixin'
    ],
    function (
        declare,
        ServiceManagerAwareMixin
    ){

        return declare (
            'Sds/Test/ServiceManager/Asset/Zoo',
            [ServiceManagerAwareMixin],
            {
                name: 'the Sds zoo',
                lion: undefined,
                lion2: undefined,
                tiger: undefined
            }
        );
    }
);


