define ([
        'dojo/_base/declare'
    ],
    function (
        declare
    ){

        return declare (
            'Sds/Test/ModuleManager/Asset/Tiger',
            [],
            {
                name: 'toby',

                sound: 'roar',

                makeSound: function(){
                    return this.sound;
                }
            }
        );
    }
);


