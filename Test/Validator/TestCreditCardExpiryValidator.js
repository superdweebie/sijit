define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestCreditCardExpiryValidator", require.toUrl("./TestCreditCardExpiryValidator.html"));
	}
});
