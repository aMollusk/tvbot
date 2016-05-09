'use strict'

var util = require('util');
var path = require('path');
var fs = require('fs');
var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');
var request = require('request');
var striptags = require('striptags');



var helper = require('./helpers.js')


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
      var tvObject = {}
      console.log('yay')

      // Identify existance of TVBOT
      if(message.indexOf('tvbot') > -1){
        active = true;
        // Identify existance of COMMAND
        if(message.indexOf('next') > -1){
          command = 'next'
        } else if (message.indexOf('last') > -1){
          command = 'last'
        } else if (message.indexOf('another') > -1){
          command = 'another'
        }
      }

      // find TVshow
      if(active === true && command !== 'none'){
        var tvObject = helper.filterString(message, command)
      }


      switch(command){
        case 'next':
          this._nextTv(tvObject)
          break;
        default:
          console.log('no command')
      }


      // return tvObject
}

lol.prototype._nextTv = function(tvObject){

  var reqUrl = "http://api.tvmaze.com/singlesearch/shows?q=" + tvObject.tvShow + "&embed=episodes";
  var tvBot = this;
  var currentDate = new Date();

  function postShow(err, res, body){
    if (!err && res.statusCode == 200) {
     var res = JSON.parse(body)

     res._embedded.episodes;
     var episode = helper.findNext(res._embedded.episodes)

     var res = '*Title:* ' + episode.name +
               '\n*Airdate:* ' + episode.airdate +
               '\n*Season:* ' + episode.season +
               '\n*Episode:* ' + episode.number +
               '\n*Summary:* ' + striptags(episode.summary);


     console.log(res)
     tvBot.postMessageToChannel('general', res)

   } else {
     tvBot.postMessageToChannel('general', 'Sorry, I could not find that tvshow')
   }
  }

  request(reqUrl, postShow)
}




module.exports = lol;
