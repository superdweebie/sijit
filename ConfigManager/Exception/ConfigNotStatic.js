define([
    'dojo/errors/create',
    '../../Exception/Base'
],
function(create, Base){

	// module:
	//		Sds/ConfigManager/Exception/ConfigNotStatic

	return create("ConfigNotStatic", null, Base, {
		message: "Merged config properties cannot be objects",
        consoleLog: true
	});
});
