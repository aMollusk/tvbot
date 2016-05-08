'use strict';



var Lol = require('../lib/app.js');

var token = 'xoxb-40314032773-yuqYiMJbAVeCgDmuZq8bMsAN';
var name = 'tvbot';

var lol = new Lol({
    token: token,
    name: name
});

lol.run();

lol.on('start', function(){
    // lol.postMessageToChannel('general', 'yay');
})

lol.on('message', function(data){

  if (data.type == 'message') {
    // console.log(this._mentionTvbot(data.text))
    var instruction = this._mentionTvbot(data.text)
    if(instruction.active === true && instruction.command != 'none'){
      this.postMessageToChannel('general', this._queryTv(filterString(data.text, instruction.command)))
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
