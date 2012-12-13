define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/Mvc/TestBaseModelJsonRestStore", require.toUrl("./TestBaseModelJsonRestStore.html"));
	}
});
