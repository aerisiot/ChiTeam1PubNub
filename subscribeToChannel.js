var pubnub = require('pubnub');

var pubnubSubKey = your_PubNub_Subscribe_Key;
//set logverbosity to true to see more details in logs
var pubnubObj = new pubnub({
    subscribeKey: pubnubSubKey,
    logVerbosity: false,
    ssl: true
});

pubnubObj.addListener({
    
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belongs
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
        console.log(msg);
    },
    presence: function(p) {
        // handle presence
        var action = p.action; // Can be join, leave, state-change or timeout
        var channelName = p.channel; // The channel for which the message belongs
        var occupancy = p.occupancy; // No. of users connected with the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are connected with the channel
    },
    status: function(s) {
        // handle status
        console.log(s);
    }
});

pubnubObj.subscribe({
        channels: ['clicksend-text-response'],
        withPresence: true // also subscribe to presence instances.
});