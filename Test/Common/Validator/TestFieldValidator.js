define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Common/Validator/TestFieldValidator", require.toUrl("./TestFieldValidator.html"));
	}
});
