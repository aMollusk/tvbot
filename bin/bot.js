'use strict';

var request = require('request');

var Lol = require('../lib/app.js');

var token = 'xoxb-40314032773-H4dHpIi5s2R4M5Qx2vvEBwgq';
var name = 'tvbot';

var lol = new Lol({
    token: token,
    name: name
});

lol.run();

lol.on('start', function(){
    lol.postMessageToChannel('general', 'Hey! Tvbot is action-town');
})

lol.on('message', function(data){

  if (data.type == 'message') {
    // console.log(this._mentionTvbot(data.text))
      var tvObject = this._mentionTvbot(data.text)
      var reqUrl = "http://api.tvmaze.com/singlesearch/shows?q=" + tvObject.tvShow + "&embed=episodes";
  }
})






// filterString('tvbot, next game of thrones', 'next')






















// lol
