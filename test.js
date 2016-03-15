var getSteamID64 = require('./lib/steamid64');

var username = 'yllanos';
var baseURL = "http://steamcommunity.com/id/";

getSteamID64(baseURL + username +  "/?xml=1")
  .then(function (result) {
    console.log(result);
  })
  .catch(function (reason) {
    console.error("%s; %s", reason.error.message, reason.options.url);
    console.log("%j", reason.response.statusCode);
    return reason.error.message;
  });
