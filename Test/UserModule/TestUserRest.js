define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds.UserModule.Test.TestUserRest", require.toUrl("./RobotUserRest.html"));
	}
});
