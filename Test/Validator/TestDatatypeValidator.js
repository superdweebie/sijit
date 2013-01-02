define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Validator/TestDatatypeValidator", require.toUrl("./TestDatatypeValidator.html"));
	}
});