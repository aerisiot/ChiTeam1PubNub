var pubnub = require('pubnub');
// Generate a v1 UUID (time-based) 
const uuidV1 = require('uuid/v1');

var pubnubPubKey = your_pubnub_publishKey;
var pubnubSubKey = your_pubnub_subscriberKey;
var pubnubObj = new pubnub({
    publishKey: pubnubPubKey,
    subscribeKey: pubnubSubKey,
    logVerbosity: false,
    ssl: true
});

var channel = 'clicksend-text';
var deviceId = your_device_id;

// require for unit tests only
var responseChannel = channel;

var messageId = uuidV1();

console.log("Message ID:", messageId);

var testResponse = 0;
//in the message payload change the number in "to" field to whereever you want to send the message
pubnubObj.publish({
    channel: responseChannel,
    message: {
        "deviceId": deviceId,
        "body": "Door opened or any other important message your application wants",
        "requestId": messageId,
        "to": "1234567891"
    }
}, function (status, res) {
    console.log('--------------------Pubnub response--------------------');
    if (status.error) {
        console.log(status);
    } else {
        console.log(res);
    }
    console.log('--------------------Pubnub response--------------------');
});
