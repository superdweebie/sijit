define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'Sds/Common/Form/_TextAreaMixin',
    'dojo/text!./Template/TextArea.html'
    ],
    function (
        declare,
        Widget,
        TemplatedMixin,
        TextAreaMixin,
        template
        ){
        return declare(
            'Sds/Common/Form/TextArea',
            [Widget, TemplatedMixin, TextAreaMixin],
            {
                templateString: template
            }
            );
    });
