define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("sijit.ConfigManager.Test.TestConfigManager", require.toUrl("./TestConfigManager.html"));
	}
});


