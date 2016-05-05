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
  lol.postMessageToChannel('general', 'YAYYY');

})
