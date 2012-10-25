define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Common/_DialogMixin',
    'dojo/text!./Template/Dialog.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    DialogMixin,
    template
){
    // module:
    //		Sds/Common/Dialog

    return declare(
        'Sds/Common/Dialog',
        [Widget, TemplatedMixin, DialogMixin],
        {
            // templateString: string
            //      The widget template. To override this, use the paths directive on the AMD loader.
            templateString: template
        }
    );
});
