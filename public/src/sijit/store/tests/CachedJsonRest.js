define([
        'doh/main',
        'sijit/store/CachedJsonRest'
    ],
    function(
        doh,
        CachedJsonRest
    ){

        doh.register("sijit.store.tests.CachedJsonRest", [
            function createTest(doh){
                doh.debug('*SKIPPED sijit.store.tests.CachedJsonRest::createTest');
                return;
            }
        ]);
    }
);


