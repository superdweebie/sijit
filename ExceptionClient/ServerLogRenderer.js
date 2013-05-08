define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'get!../Store/storeManager'
],
function(
    declare,
    lang,
    storeManager
){
    return declare(
        [],
        {
            render: function(exceptionModel){

                lang.mixin(exceptionModel, {
                    pageUrl: window.location.href,
                    pageTitle: document.title,
                    referrerUrl: document.referrer,
                    operatingSystem: navigator.platform,
                    browserName: navigator.appName,
                    browserVersion: navigator.appVersion
                });

                var store = storeManager.getStore('Exception');
                store.put(exceptionModel);
            }
        }
    );
});
