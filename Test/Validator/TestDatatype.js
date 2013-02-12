define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestDatatype", require.toUrl("./TestDatatype.html"));
	}
});