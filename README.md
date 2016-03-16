# customurl2steamid64
VERY simple NodeJS module to get a user's steamID64 based on customURL. No API key needed.

### What's this for?
This module will allow you to get the SteamID64 for any Steam player, as long as the target profile is public.

### But why?
I couldn't find this utility for a project I'm working on, so I decided to write it myself and learn some NodeJS in the process.

### Is this oficially supported?
Not by Valve Software by any means. I'm just a fan. I'll try to support development of this library for as long as I can

### Cloning
    $ git clone https://github.com/yllanos/customurl2steamid64.git

### Installing
Using [npm](https://www.npmjs.com/):

    $ npm install customurl2steamid64

### Testing
    $ node test.js

(You should get this number on your console):
    76561198008252756

You could also alter [this file](../blob/master/test.js) on variable 'username' to whatever Steam user you wish to test

### Integration example (steam-web)
Using the test file above as template, we are going to integrate with the [steam-web](https://www.npmjs.com/package/steam-web) library:

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
