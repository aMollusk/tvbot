'use strict';

var request = require('request');


var Lol = require('../lib/app.js');

var token = 'xoxb-40314032773-oyzpGoxetR8YYUEjjtnuwkuw';
var name = 'tvbot';

var lol = new Lol({
    token: token,
    name: name
});

lol.run();

lol.on('start', function(){

    lol.postMessageToChannel('general', 'YAYYY');



})

lol.on('message', function(data){

  if (data.text.indexOf('game of thrones') > -1) {

    var req = 'game-of-thrones'
    request('http://api.tvmaze.com/singlesearch/shows?q=game-of-thrones&embed=episodes', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var res = 'the next episode is called' + response._embedded.episodes[0].name;
        lol.postMessageToChannel('general', res)
      }
    })
  }
})
