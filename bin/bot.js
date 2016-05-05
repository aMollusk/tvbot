'use strict';

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
  if(data.text.indexOf('hello') > -1) {
    lol.postMessageToChannel('general', 'Hi there.')
  }
})
