define([
    'dojo/errors/create',
    './Base'
],
function(create, Base){

	// module:
	//		Sds/Exception/Application

	return create("ApplicationException", null, Base, {
        consoleLog: false
	});
});