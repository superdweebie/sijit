define([
        'dojo/_base/declare',
        'dojo/_base/lang'
    ],
    function (
        declare,
        lang
    ) {
        // module:
        //		sijit/ServiceManager/Ref

        return declare
        (
            'sijit.ServiceManager.Ref',
            null,
            {
                // summary:
                //		A reference to get or use an object.
                //
                // description:
                //      If the constructor is passed stateful: true, then an additional three functions
                //      are created:
                //           get
                //           set
                //           watch

                _identity: undefined,

                _serviceManager: undefined,

                constructor: function(identity, isStateful, serviceManager){

                    this._identity = identity;
                    this._serviceManager = serviceManager;

                    if (isStateful) {
                        this.get = lang.hitch(this, function(property){
                            return this._serviceManager.get(this._identity, property);
                        });
                        this.set = lang.hitch(this, function(property, value){
                            return this._serviceManager.set(this._identity, property, value);
                        });
                        this.watch = lang.hitch(this, function(property, callback){
                            return this._serviceManager.watch(this._identity, property, callback);
                        });
                    }
                },
                createObject: function(){
                    return this._serviceManager.createObject(this._identity);
                },
                getObject: function(){
                    return this._serviceManager.getObject(this._identity);
                }
            }
        )
    }
);


