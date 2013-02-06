define([
    'require',
    'dojo/has',
    'dojo/json',
    'util/build/fs',
    'Sds/ConfigManager/configManager',
    'Sds/Common/utils'
],
function(
    require,
    has,
    json,
    fs,
    configManager,
    utils
){

	// host-dependent environment initialization
	if(has("host-node")){
		define("commandLineArgs", function(){
			//arg[0] is node; argv[1] is dojo.js; therefore, start with argv[2]
			return process.argv.slice(2);
		});

		// helps during dev or heavily async node...
		var util = require.nodeRequire("util");
		debug = function(it, depth, inspect){
			util.debug(inspect ? util.inspect(it, false, depth) : it);
		};

		// TODO: make this real
		has.add("is-windows", 0);
	}else if(has("host-rhino")){
		define("commandLineArgs", [], function(){
			var result = [];
			require.rawConfig.commandLineArgs.forEach(function(item){
				var parts = item.split("=");
				if(parts[0]!="baseUrl"){
					result.push(item);
				}
			});
			return result;
		});
		// TODO: make this real
		has.add("is-windows", /indows/.test(environment["os.name"]));
	}else{
		console.log("unknown environment; terminating.");
		return 0;
	}

	this.require.scopeify = function(moduleList){
		for(var p, mid, module, text = "", contextRequire = this, args = moduleList.split(","), i = 0; i<args.length;){
			mid = args[i++].match(/\S+/)[0];
			module = contextRequire(mid);
			mid = mid.match(/[^\/]+$/)[0];
			for(p in module){
				text+= "var " + p + "=" + mid + "." + p + ";\n";
			}
		}
		return text;
	};

    //List of plugin resolves to be added to the build profile
    var sdsplugins = {
        plugins: {
            "Sds/ConfigManager/configReady":"Sds/Build/plugin/configReady",
            "Sds/Router/baseUrl":"Sds/Build/plugin/baseUrl",
            "Sds/Router/startedRouter":"Sds/Build/plugin/startedRouter",
            "Sds/ModuleManager/Shared/getModuleManager":"Sds/Build/plugin/getModuleManager",
            "Sds/ModuleManager/Shared/proxy":"Sds/Build/plugin/proxy",
            "Sds/ModuleManager/Shared/get":"Sds/Build/plugin/get"
        }
    };

    //List of AMD aliases to be added tothe build profile
    var sdsAliases = [
        ['get', 'Sds/ModuleManager/Shared/get'],
        ['proxy', 'Sds/ModuleManager/Shared/proxy']
    ];

    var testLayer = {
        "Sds/Test/Built":{
            "custombase":false,
            "boot":false,
            "include":[
                "Sds/Form/Captcha",
                "Sds/Form/CheckBox",
                "Sds/Form/TextBox"
            ],
            "exclude": [
                "dojo"
            ]
        }
    };

    //Load and process the profile
    require(['util/build/argv'], function(argv){
        var profile = argv.args.profiles[0];

        // inject extra build plugin resolvers
        profile = utils.mixinDeep(profile, sdsplugins);

        // add amd aliases
        if ( ! profile.defaultConfig){
            profile.defaultConfig = {};
        }
        if ( ! profile.defaultConfig.aliases){
            profile.defaultConfig.aliases = [];
        }
        profile.defaultConfig.aliases = profile.defaultConfig.aliases.concat(sdsAliases);

        // determine preprocessed filename
        var splitFilename = profile.selfFilename.split('.');
        var filename = '';
        var count = splitFilename.length;
        var index;
        for (index in splitFilename){
            if (index == count -1){
                filename += '.preprocessed';
            }
            filename += '.' + splitFilename[index];
        }
        filename = filename.slice(1, filename.length);
        delete profile.selfFilename;

        // timestamp layer names
        if (profile.timestampLayers){
            var newLayers = {};
            var newName;
            var timestamp = new Date().getTime().toString();
            for (var name in profile.layers){
                newLayers[name + timestamp] = profile.layers[name];
            }
            profile.layers = newLayers;
        }
        delete profile.timestampLayers;

        //add test layer for maxi builds
        if ( ! profile.mini){
            profile.layers = utils.mixinDeep(profile.layers, testLayer);
        }

        // merge configs into the defaultConfig
        if (profile.defaultConfig.mergeConfigs){
            var mergedConfig = {};
            configManager.merge(profile.defaultConfig.mergeConfigs, mergedConfig).then(function(mergedConfig){
                profile.defaultConfig = utils.mixinDeep(profile.defaultConfig, mergedConfig);
                delete(profile.defaultConfig.mergeConfigs);
                fs.writeFileSync(filename, 'var profile = ' + json.stringify(profile, null, '    '));
                console.log('Preprocessed build profile written to: ' + filename);
            });
        }
    });
});