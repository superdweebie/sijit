define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Common/Validator/TestDatatypeValidator", require.toUrl("./TestDatatypeValidator.html"));
	}
});