define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestIs", require.toUrl("./TestIs.html"));
	}
});