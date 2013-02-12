define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestFactory", require.toUrl("./TestFactory.html"));
	}
});