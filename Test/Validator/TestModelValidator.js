define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestModelValidator", require.toUrl("./TestModelValidator.html"));
	}
});
