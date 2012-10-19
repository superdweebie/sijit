define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds.Test.AuthenticationModule.TestAuthenticationController", require.toUrl("./TestAuthenticationController.html"));
	}
});
