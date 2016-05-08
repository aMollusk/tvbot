'use strict';

var request = require('request');

var Lol = require('../lib/app.js');

var token = 'xoxb-40314032773-dDXuKYROzSpKKVYvaIIJTR52';
var name = 'tvbot';

var lol = new Lol({
    token: token,
    name: name
});

lol.run();

lol.on('start', function(){
    lol.postMessageToChannel('general', 'yay');

})

lol.on('message', function(data){


  if (data.type == 'message') {
    // console.log(this._mentionTvbot(data.text))
    var instruction = this._mentionTvbot(data.text)
    if(instruction.active === true && instruction.command != 'none'){
      var tvObject = filterString(data.text, instruction.command)
      console.log(tvObject)
      var response = 'none'
      var reqUrl = "http://api.tvmaze.com/singlesearch/shows?q=" + tvObject.tvShow + "&embed=episodes";
      console.log(reqUrl)

      request(reqUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var res = JSON.parse(body)
          var res = 'the next episode is called *' + res._embedded.episodes[res._embedded.episodes.length - 1].name + '*';
          console.log(res)
          lol.postMessageToChannel('general', res);
        } else {
          lol.postMessageToChannel('general', 'Sorry, I could not find that tvshow')
        }
      })
    }
  }
})

var filterString = function(message, command) {
    var indexOfCommand = message.indexOf(command) + command.length;
    var tvShow = message.slice(indexOfCommand + 1, message.length)

    tvShow = tvShow.replace(/\s+/g, '-')
    console.log(tvShow)

    return {
      tvShow,
      command
    }

}




// filterString('tvbot, next game of thrones', 'next')






















// lol
