define([
    'dojo/_base/lang',
    'dojo/_base/array'
],
function(
    lang,
    array
){
    return {

        //manager: undefined,

        abreviations: {
            Trim: 'Sds/Filter/Trim',
            Lowercase: 'Sds/Filter/Lowercase',
            Propercase: 'Sds/Filter/Propercase',
            PadCurrency: 'Sds/Filter/PadCurrency',
            Uppercase: 'Sds/Filter/Uppercase',
            Group: 'Sds/Filter/Group'
        },

        create: function(config){

            switch (true){
                case Boolean(this.abreviations[config]):
                    config = this.abreviations[config];
                    break;
                case lang.isArray(config):
                    config = array.map(config, lang.hitch(this, function(item){
                        if (this.abreviations[item]){
                            return this.abreviations[item];
                        } else {
                            return item;
                        }
                    }));
                    config = {
                        base: 'Sds/Filter/Group',
                        gets: {
                            filters: config
                        }
                    };
                    break;
            }

            return this.manager.get(config);
        }
    }
});
