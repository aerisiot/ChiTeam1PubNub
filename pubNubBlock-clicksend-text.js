var acApiKey = your_api_key_for_aercloud; //key for aercloud
var accountId = your_account_id_for_aercloud; //account id for aercloud
var aerCloudUrl = 'https://api.aeriscloud.aeris.com'; //aercloud url 
var containerId = your_aercloud_aercloud_container; 
var postToAerCloud = true;

var pubnub = require('pubnub');
// require xhr 
var xhr = require('xhr');
var auth = require('codec/auth');

export default (request) => {

    //  api key
    var apiUsername = your_api_username_for_clicksend_API_for_SMS;
    var apiKey = your_apiKey_for_clicksend_API_for_SMS;

    // api endpoint
    var apiUrl = 'https://rest.clicksend.com/v3/sms/send';
    var channel = request.channels[0];

    // require for unit tests only
    var responseChannel = channel + '-response';

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: auth.basic(apiUsername, apiKey)
        },
        body: JSON.stringify({messages: [{
            source: "blocks",
            body: request.message.body,
            from: "clicksend",
            to: request.message.to
        }]})
    };


    // create a HTTP POST request to the sendgrid API
    return xhr.fetch(apiUrl, options).then((r) => {
        console.log(r);

        var testResponse = '0';
        if (r.status == 200) {
            testResponse = request.message.requestId || '1';
        }
        
        //publish your message on pubnub channel
        pubnub.publish({
            channel: responseChannel,
            message: testResponse
        });
        
        //Post to AerCloud - Begin
        if (postToAerCloud) {
            var jsonObject = JSON.stringify({
                "message" : request.message.body,
                "sendTo" : request.message.to,
                "requestId" : request.message.requestId,
                "status": (testResponse === '0') ? "fail" : "success",
                "timetoken": Date.now()
            });
            
            var path = '/v1/' + accountId + '/scls/' + request.message.deviceId + '/containers/' + containerId + '/contentInstances';
            var acUrl = aerCloudUrl + path + '?apiKey=' + acApiKey;
            
            console.log(acUrl);
            
            var acOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: jsonObject
            };
            
            // create a HTTPS POST request AerCloud API
            xhr.fetch(acUrl, acOptions).then((acr) => {
                console.log(acr);
                
                if (acr.status == 200)
                    console.log('Post to AerCloud successful');
                else
                    console.log('Post to AerCloud failed');
            }).
            catch(ace => {
                console.error(ace);
                return request.ok();
            });
        }
        
        //Post to AerCloud - End
        
        return request.ok()
    })
    .catch(e => {
        console.error(e);
        pubnub.publish({
            channel: responseChannel,
            message: 0
        });
        return request.ok();
    });
};

