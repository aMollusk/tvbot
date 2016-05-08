'use strict'

var util = require('util');
var path = require('path');
var fs = require('fs');
var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');
var request = require('request');



var lol = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'lol';
  // this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'norrisbot.db');
  this.user = null;
  this.db = null;
};


util.inherits(lol, Bot);

lol.prototype.run = function () {
    lol.super_.call(this, this.settings);

    // this.on('start', this._onStart);
    // this.on('message', this._onMessage);
};

lol.prototype.onStart = function() {
  this._loadBotUser();
  var params = {
        icon_emoji: ':cat:'
    };
  bot.postMessageToChannel('general', 'meow!', params);
  // this._connectDb();
  // this._firstrunCheck();
}
lol.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

lol.prototype._welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'Hi guys, roundhouse-kick anyone?' +
        '\n I can tell jokes, but very honest ones. Just say `Chuck Norris` or `' + this.name + '` to invoke me!',
        {as_user: true});
};

lol.prototype._mentionTvbot = function(message) {

      var command = 'none'
      var active = false;

      if(message.indexOf('tvbot') > -1){
        active = true;

        if(message.indexOf('next') > -1){
          command = 'next'
        } else if (message.indexOf('last') > -1){
          command = 'last'
        } else if (message.indexOf('another') > -1){
          command = 'another'
        }
      }

      return {
        command,
        active
      }

}


lol.prototype._queryTv =  function(tvObject) {

  console.log(tvObject)
  var response = 'none'
  var reqUrl = "http://api.tvmaze.com/singlesearch/shows?q=" + tvObject.tvShow + "&embed=episodes";
  console.log(reqUrl)

  //
  // request
  // .get(reqUrl)
  // .on('response', function(response){
  //   var res = JSON.parse(body)
  // })

  //
  // request(reqUrl, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     var res = JSON.parse(body)
  //     var res = 'the next episode is called *' + res._embedded.episodes[res._embedded.episodes.length - 1].name + '*';
  //     return res;
  //   }
  // })


  var res = request(reqUrl, function(err, response, body){
    return body;
  });
  console.log(res)
  res = JSON.parse(res)
  res = 'the next episode is called *' + res._embedded.episodes[res._embedded.episodes.length - 1].name + '*';
  return res;



}

module.exports = lol;
