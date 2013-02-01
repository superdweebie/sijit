define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Filter/TestFactory", require.toUrl("./TestFactory.html"));
	}
});