define([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/Stateful',
        'Sds/ServiceManager/Exception/IncorrectTypeException'
    ],
    function (
        declare,
        Deferred,
        Stateful,
        IncorrectTypeException
    ) {
        // module:
        //		Sds/ServiceManager/Plugin/Stateful

        return {

            serviceManagerMixin: {
                get: function(/*string*/ identifier, /*string*/ property) {
                    // summary:
                    //     Get the property value of the identifier. This may happen async.
                    //     The returned deferred will resovle to the property value when the get is complete.
                    //     This will only work for objects are dijits or configured as isStateful
                    var deferredGet = new Deferred();

                    Deferred.when(this.getObject(identifier), function(object){
                        if ( ! object instanceof Stateful) {
                            throw new IncorrectTypeException('get only works for stateful objects');
                        }
                        deferredGet.resolve(object.get(property));
                    });

                    return deferredGet;
                },
                set: function(/*string*/ identifier, /*string*/ property, /*mixed*/ value){
                    // summary:
                    //     Set the property of the identifier to a value. This may happen async.
                    //     The returned deferred will resovle to true when the set is complete.
                    //     This will only work for objects that are configured as dojo\Stateful

                    var deferredSet = new Deferred();

                    Deferred.when(this.getObject(identifier), function(object){
                        if ( ! object instanceof Stateful) {
                            throw new IncorrectTypeException('set only works for stateful objects');
                        }
                        object.set(property, value);
                        deferredSet.resolve(true);
                    });

                    return deferredSet;
                },
                watch: function(/* string */ identifier, /* string */ property, /* function */ callback){
                    // summary:
                    //     Apply a watch on the property of the identifier. Callback will
                    //     be called when the watch is activated. Applying the watch may happen async.
                    //     The returned deferred will resovle to the watchHandle when the watch apply is complete.
                    //     This will only work for objects that are configured as dojo/Stateful

                    var deferredWatch = new Deferred();

                    Deferred.when(this.getObject(identifier), function(object){
                        if ( ! object instanceof Stateful) {
                            throw new IncorrectTypeException('watch only works for stateful objects');
                        }
                        deferredWatch.resolve(object.watch(property, callback));
                    });

                    return deferredWatch;
                }
            },
            refExtend: declare(
                'Sds/ServiceManager/Plugin/StatefulRef',
                [Stateful],
                {
                    get: function(property){
                        return this._serviceManager.get(this._identity, property);
                    },
                    set: function(property, value){
                        return this._serviceManager.set(this._identity, property, value);
                    },
                    watch: function(property, callback){
                        return this._serviceManager.watch(this._identity, property, callback);
                    }
                }
            )
        };
    }
);
