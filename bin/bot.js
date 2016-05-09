'use strict';

var request = require('request');

var Lol = require('../lib/app.js');

var token = process.env.BOT_API_KEY;
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
      var tvObject = this._mentionTvbot(data.text.toLowerCase())
  }

})






// filterString('tvbot, next game of thrones', 'next')






















// lol
