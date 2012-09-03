define ([
        'dojo/_base/declare'
    ],
    function (
        declare
    ){
        var model = declare (
            'Sds/View/BaseViewModel',
            null,
            {}
        );

        model.metadata = {
            fields: []
        };

        return model;
    }
);


