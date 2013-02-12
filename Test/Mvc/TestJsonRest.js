define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Mvc/TestJsonRest", require.toUrl("./TestJsonRest.html"));
	}
});
