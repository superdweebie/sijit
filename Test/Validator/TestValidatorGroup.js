define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestValidatorGroup", require.toUrl("./TestValidatorGroup.html"));
	}
});