# ChiTeam1PubNub
Use PubNub &amp; Raspberry Pi to send / receive messages

This project is using
1) blockonJs.js file to put the code on the IoT device which publishes the data over the pubnub channel
2) pubNubBlock-clicksend-text.js which is essentially the code on pubnub BLOCKS which works as an event handler, it does not need any node packages to be installed explicitly 
3) subscribe-block.js file to put the code on IoT device which is just to listen to the same channel and to make sure the data is properly sent to pubnub BLOCKS

Create your pubnub account here: https://www.pubnub.com/

Here the code on Pubnub BLOCKS is using 3rd party API clicksend to send the SMS, create your account here: https://www.clicksend.com/us/

Buy aeris SIMs here: https://store.aeriscloud.com/

After getting your aeris SIMs, provision your device , get them ready in billing (in service) mode here: http://ssaerport.aeris.com/web/guest/dashboard

aercloud account to access your data is here: http://neo.aercloud.aeris.com/
