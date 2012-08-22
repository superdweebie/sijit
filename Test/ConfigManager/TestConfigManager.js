define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds.Test.ConfigManager.TestConfigManager", require.toUrl("./TestConfigManager.html"));
	}
});


