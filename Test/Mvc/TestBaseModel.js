define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Mvc/TestBaseModel", require.toUrl("./TestBaseModel.html"));
	}
});
