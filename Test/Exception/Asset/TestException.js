define([
    'dojo/errors/create',
    'Sds/Exception/Base'
],
function(create, Base){

	// module:
	//		dojo/errors/RequestTimeoutError

	/*=====
	 return function(){
		 // summary:
		 //		TODOC
	 };
	 =====*/

	return create("TestException", null, Base, {
		message: "Test Exception"
	});
});