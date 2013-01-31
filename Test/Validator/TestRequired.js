define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestRequired", require.toUrl("./TestRequired.html"));
	}
});