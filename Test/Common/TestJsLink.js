define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds.Test.Common.TestJsLink", require.toUrl("./TestJsLink.html"));
	}
});