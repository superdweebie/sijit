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

        abreviations: [
            'Trim',
            'Lowercase',
            'Propercase',
            'PadCurrency',
            'Uppercase',
            'Group',
            'HexColor'
        ],

        expand: function(base){
            if (array.indexOf(this.abreviations, base) != -1) {
                return 'Sds/Filter/' + base;
            }
            return base;
        },

        create: function(config){

            switch (true){
                case lang.isArray(config):
                    config = array.map(config, lang.hitch(this, function(item){
                        if (typeof item == 'object') {
                            item.base = this.expand(item.base);
                            return item;
                        }
                        return this.expand(item);
                    }));
                    config = {
                        base: 'Sds/Filter/Group',
                        gets: {
                            filters: config
                        }
                    };
                    break;
                case typeof config == 'object':
                    config.base = this.expand(config.base);
                    break;
                default:
                    config = this.expand(config);
            }

            return this.manager.get(config);
        }
    }
});