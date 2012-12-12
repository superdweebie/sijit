define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Store/TestStoreManager", require.toUrl("./TestStoreManager.html"));
	}
});