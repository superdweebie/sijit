define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestCreditCardExpiry", require.toUrl("./TestCreditCardExpiry.html"));
	}
});
