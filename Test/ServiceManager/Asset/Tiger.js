define ([
        'dojo/_base/declare',
        'dojo/Stateful'
    ],
    function (
        declare,
        Stateful
    ){

        return declare (
            'Sds/Test/ServiceManager/Asset/Tiger',
            [Stateful],
            {
                name: 'toby'
            }
        );
    }
);


