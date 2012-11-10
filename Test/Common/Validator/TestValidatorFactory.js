define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Common/Validator/TestValidatorFactory", require.toUrl("./TestValidatorFactory.html"));
	}
});