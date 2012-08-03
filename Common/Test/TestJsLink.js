define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("sijit.Common.Test.TestJsLink", require.toUrl("./TestJsLink.html"));
	}
});