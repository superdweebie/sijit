var profile = (function(){
	var testResourceRe = /^Sds\/Test\//;
    var buildResourceRe = /^Sds\/Build\//;
    var seleniumResourceRe = /^Sds\/selenium\//;

    var copyOnly = function(filename, mid){
        var list = {
			"Sds/Sds.profile":1,
            "Sds/package.json":1
        };
        return
            (mid in list) ||
            /(png|jpg|jpeg|gif|tiff)$/.test(filename);
    };

    return {
        resourceTags:{

            ignore: function(filename, mid){
				return
                    buildResourceRe.test(mid) ||
                    seleniumResourceRe.test(mid) ||
                    mid == "Sds/Build" ||
                    mid == "Sds/selenium" ||
                    mid == "Sds/README.md" ||
                    mid == "Sds/phpunit.xml.dist" ||
                    mid == "Sds/debug-tests.sh"
                ;
            },

            test: function(filename, mid){
				return testResourceRe.test(mid) || mid=="Sds/Test";
            },

            copyOnly: function(filename, mid){
                return copyOnly(filename, mid);
            },

            amd: function(filename, mid){
                return !copyOnly(filename, mid) && /\.js$/.test(filename);
            }
        },

        trees:[
            [".", ".", /(\/\.)|(~$)/]
        ]
    };
})();