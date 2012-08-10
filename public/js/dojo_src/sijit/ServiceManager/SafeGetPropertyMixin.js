define ([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/_base/lang',
        'dojo/Stateful',
        'sijit/ServiceManager/Ref'
    ],
    function (
        declare,
        Deferred,
        lang,
        Stateful,
        Ref
    ){
        // module:
        //		sijit/ServiceManager/SafeGetPropertyMixin

        return declare (
            'sijit.ServiceManager.SafeGetPropertyMixin',
            null,
            {
                // summary:
                //		Can be mixed into objects that have properties that could be
                //		reference objects

                safeGetProperty: function(property){
                    // Checks to see if the property is a reference. If so, the reference is loaded.
                    // If not, the property is returned.
                    var propertyDeferred = new Deferred;

                    if (this[property] instanceof Ref){
                        Deferred.when(this[property].getObject(), lang.hitch(this, function(object){
                            this[property] = object;
                            if (this instanceof Stateful) {
                                propertyDeferred.resolve(this.get(property));
                            } else {
                                propertyDeferred.resolve(this[property]);
                            }
                        }));
                    } else {
                        if (this instanceof Stateful) {
                            propertyDeferred.resolve(this.get(property));
                        } else {
                            propertyDeferred.resolve(this[property]);
                        }
                    }
                    return propertyDeferred;
                }
            }
        );
    }
);

