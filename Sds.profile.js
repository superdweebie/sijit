var profile = (function(){
	var testResourceRe = /^Sds\/Test\//;
    var buildResourceRe = /^Sds\/Build\//;
    var seleniumResourceRe = /^Sds\/selenium\//;
    var travisResourceRe = /^Sds\/.travis\//;
    var docsResourceRe = /^Sds\/docs\//;

    var ignore = function(filename, mid){
        var list = {
            "Sds/Build"            : true,
            "Sds/.travis"          : true
        };
        return (mid in list) ||
            buildResourceRe.test(mid) ||
            travisResourceRe.test(mid);
    };

    var test = function(filename, mid){
        var list = {
            "Sds/Test"     : true,
            "Sds/phpunit.xml.dist" : true,
            "Sds/debug-tests.sh"   : true,
            "Sds/selenium" : true
        };
        return (mid in list) ||
            testResourceRe.test(mid) ||
            seleniumResourceRe.test(mid);
    };

    var copyOnly = function(filename, mid){
        var list = {
			"Sds/Sds.profile"  : true,
            "Sds/package.json" : true
        };
        return (mid in list) ||
            /(png|jpg|jpeg|gif|tiff)$/.test(filename);
    };

    var miniExclude = function(filename, mid){
        var list = {
            "Sds/docs"      : true,
            "Sds/README.md" : true
        };
        return (mid in list) ||
            docsResourceRe.test(mid);
    };

    return {
        resourceTags:{

            ignore: function(filename, mid){
				return ignore(filename, mid);
            },

            test: function(filename, mid){
				return test(filename, mid);
            },

            copyOnly: function(filename, mid){
                return copyOnly(filename, mid);
            },

            miniExclude: function(filename, mid){
                return miniExclude(filename, mid);
            },

            amd: function(filename, mid){
                return !test(filename, mid) &&
                    !copyOnly(filename, mid) &&
                    !ignore(filename, mid) &&
                    (/\.js$/).test(filename);
            }
        }
    };
})();