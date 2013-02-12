define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestGroup", require.toUrl("./TestGroup.html"));
	}
});