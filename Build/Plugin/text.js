define(["dojo/json", "dojo/_base/array", "util/build/fs"], function(json, array, fs){
	return {
		start:function(
			mid,
			referenceModule,
			bc
		){
			// mid may contain a pragma (e.g. "!strip"); remove
			mid = mid.split("!")[0];

			var textPlugin = bc.amdResources["dojo/text"],
			moduleInfo = bc.getSrcModuleInfo(mid, referenceModule, true),
			textResource = bc.resources[moduleInfo.url];

			if (!textPlugin){
				throw new Error("text! plugin missing");
			}
			if (!textResource){
				throw new Error("text resource (" + moduleInfo.url + ") missing");
			}

			var result = [textPlugin];
			if(bc.internStrings && !bc.internSkip(moduleInfo.mid, referenceModule)){
				result.push({
					module:textResource,
					pid:moduleInfo.pid,
					mid:moduleInfo.mid,
					deps:[],
					getText:function(trim){
						var text = this.module.getText ? this.module.getText() : this.module.text;
						if(text===undefined){
							// the module likely did not go through the read transform; therefore, just read it manually
							text= fs.readFileSync(this.module.src, "utf8");
						}

                        if (trim){
                            text = array.map(text.split('\n'), function(line){
                                return line.trim();
                            }).join('\n')
                        }
						return json.stringify(text+"");
					},
					internStrings:function(){
                        var pieces = this.mid.split('.');
                        var trim = false;
                        if (pieces[pieces.length - 1] == 'html'){
                            trim = true;
                        }
						return ["url:" + this.mid, this.getText(trim)];
					}
				});
			}
			return result;
		}
	};
});
