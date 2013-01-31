define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestModel", require.toUrl("./TestModel.html"));
	}
});
