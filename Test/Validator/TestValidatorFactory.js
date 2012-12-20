define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestValidatorFactory", require.toUrl("./TestValidatorFactory.html"));
	}
});