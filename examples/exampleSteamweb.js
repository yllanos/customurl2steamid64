var getSteamID64 = require('../lib/steamid64');
var steam = require('steam-web');

var username = 'yllanos';
var baseURL = "http://steamcommunity.com/id/";
var URL = baseURL + username +  "/?xml=1";

var s = new steam({
  apiKey: 'XXXXXXXXXXXXXXXX', // <<--PROVIDE API KEY HERE
  format: 'json' //optional ['json', 'xml', 'vdf']
});

/**
 * Example implementing steam-web
 * If you want to test a different user, just edit the 'username' variable as needed
 * Don't forget to add your own Steam API key
 * 'result' variable represents the value to be integrated into your application
 * @param {string} URL - Full URL profile for specific user.
 */
getSteamID64(URL)
  .then(function (result) {
    //steamid = result;
    s.getPlayerSummaries({
      steamids: [result],
      callback: function(err, data) {
        console.log(data["response"]["players"]);
      }
    })
  })
  .catch(function (reason) {
    console.error("%s; %s", reason.error.message, reason.options.url);
    console.log("%j", reason.response.statusCode);
    return reason.error.message;
  });
