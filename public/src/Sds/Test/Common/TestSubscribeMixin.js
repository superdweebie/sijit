define([
        'doh/main',
        'dojo/_base/lang',
        'dojo/topic',
        'Sds/Test/Common/Asset/MockSubscribeObject'
    ],
    function(
        doh,
        lang,
        topic,
        MockSubscribeObject
    ){

        doh.register("Sds.Test.Common.TestSubscribeMixin", [
            function subscribeTest(doh){

                var object = new MockSubscribeObject;

                var handle = object.subscribe('testTopic', lang.hitch(object, 'messageListener'));

                topic.publish('testTopic', 'test message');

                doh.assertEqual('test message', object.message);

                object.message = undefined;
                object.unsubscribe(handle);

                topic.publish('testTopic', 'test message');

                doh.assertNotEqual('test message', object.message);
            }
        ]);
    }
);


