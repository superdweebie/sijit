define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Filter/TestGroup", require.toUrl("./TestGroup.html"));
	}
});