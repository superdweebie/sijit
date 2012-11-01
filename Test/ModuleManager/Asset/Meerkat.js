define ([
        'dojo/_base/declare',
        'Sds/ModuleManager/ModuleManagerAwareMixin'
    ],
    function (
        declare,
        ModuleManagerAwareMixin
    ){

        return declare (
            'Sds/Test/ModuleManager/Asset/Meerkat',
            [ModuleManagerAwareMixin],
            {
                name: 'miriam'
            }
        );
    }
);


