define ([
        'dojo/_base/declare',
        'dojo/_base/array',
        'dojo/_base/lang',
        'dojo/topic'
    ],
    function (
        declare,
        array,
        lang,
        topic
    ) {
        // module:
        //		sijit/common/SubscribeMixin

        return declare (
            'sijit.common.SubscribeMixin',
            null,
            {
                // summary:
                //		Can be mixed into objects that need to subscribe to topics


                // _connects: array
                //		Array of connection handles
                _connects: [],
                _disconnect: function(/*object*/ handle) {
                    // summary:
                    //     Stop listening to a topic
                    //
                    // tags:
                    //     protected

                    var index = array.indexOf(this._connects, handle);
                    if (index != -1) {
                        handle.remove();
                        this._connects.splice(index, 1);
                    }
                },
                subscribe: function(/*string*/ topicName, /*string*/ method){
                    // summary:
                    //      Subscribe to a topic
                    var handle = topic.subscribe(topicName, lang.hitch(this, method));
                    this._connects.push(handle);
                    return handle;		// _Widget.Handle
                },
                unsubscribe: function(/*Object*/ handle) {
                    // summary:
                    //     Stop listening to a topic

                    this._disconnect(handle);
                }
            }
        );
    }
);

