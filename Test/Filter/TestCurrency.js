define([
        'doh/main',
        'Sds/Filter/Currency'
    ],
    function(
        doh,
        Currency
    ){
        doh.register("Sds/Test/Filter/TestCurrency", [

            function FilterTest(doh){
                var filter = new Currency;
                filter.currency = 'USD';

                var testArray = [
                    [null, null],
                    ['1', '1'],
                    ['1.00', '1.0'],
                    ['1.00', '1.00'],
                    ['1.00', '1.000'],
                    ['1.01', '1.008'],
                    ['1.00', '1.002'],
                    ['2.00', '1.995'],
                ];

                var index;
                for (index in testArray){
                    doh.assertEqual(testArray[index][0], filter.filter(testArray[index][1]));
                }
            }
        ]);
    }
);


