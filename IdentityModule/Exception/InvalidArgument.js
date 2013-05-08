define([
    'dojo/errors/create',
    '../../Base'
],
function(create, Base){

	// module:
	//		Sds/IdentityClient/Exception/InvalidArgument

	return create("InvalidArgument", null, Base, {
		message: "Invalid Argument",
        consoleLog: true
	});
});
