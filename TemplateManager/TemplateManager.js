define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'dojo/sniff'
],
function (
    declare,
    Deferred,
    sniff
) {
    // module:
    //		Sds/TemplateManager/TemplateManager

        return declare
        (
            'Sds/TemplateManager/TemplateManager',
            null,
            {
                // summary:
                //		An object to load different widget templates, depending on context.
                //

                // Desktop template settings
                desktop: 'desktop',

                // Mobile template settings
                mobile: 'mobile',
                ios: undefined,
                android: undefined,

                load: function(path){

                    var loadDeferred = new Deferred;

                    var theme;
                    switch (true){
                        case sniff('ios'):
                            if (this.ios){
                                theme = this.ios
                            } else {
                                theme = this.mobile
                            }
                            break;
                        case sniff('android'):
                            if (this.android){
                                theme = this.android
                            } else {
                                theme = this.mobile
                            }
                            break;
                        default:
                            theme = this.desktop;
                    }
console.debug(path.replace('[theme]', theme));
                    require([path.replace('[theme]', theme)], function(template){
                        loadDeferred.resolve(template);
                    });

                    return loadDeferred;
                }
            }
        );
    }
);
