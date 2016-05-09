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



lol.prototype._mentionTvbot = function(message) {

      var command = 'none'
      var active = false;
      var tvObject = {}
      console.log('yay')

      // Identify existence of TVBOT
      if(message.indexOf('tvbot') > -1){
        active = true;
        // Identify existence of COMMAND
        if(message.indexOf('next') > -1){
          command = 'next'
        } else if (message.indexOf('last') > -1){
          command = 'last'
        } else if (message.indexOf('first') > -1){
          command = 'first'
        } else if (message.indexOf('another') > -1){
          command = 'another'
        }
      }

      // find TVshow
      if(active === true && command !== 'none'){
        var tvObject = helper.filterString(message, command)
        this._queryTv(tvObject, command)
      }


      // switch(command){
      //   case 'next':
      //     this._nextTv(tvObject, command)
      //     break;
      //   default:
      //     this.postMessageToChannel('general', 'u wut mate?')
      // }


      // return tvObject
}

lol.prototype._queryTv = function(tvObject, command){

  var reqUrl = "http://api.tvmaze.com/singlesearch/shows?q=" + tvObject.tvShow + "&embed=episodes";
  var tvBot = this;
  var currentDate = new Date();

  function postShow(err, res, body){
    if (!err && res.statusCode == 200) {
     var res = JSON.parse(body)

     switch(command){
       case 'next':
          var episode = helper.findNext(res._embedded.episodes)
          break;
       case 'last':
          var episode = helper.findFinal(res._embedded.episodes)
          break
       case 'first':
          var episode = helper.findFirst(res._embedded.episodes)
          break
       default:
          var episode = helper.findNext(res._embedded.episodes)
     }


     var res = '*Title:* ' + episode.name +
               '\n*Airdate:* ' + episode.airdate +
               '\n*Season:* ' + episode.season +
               '\n*Episode:* ' + episode.number;

     if(episode.summary.length > 1){
       res = res + '\n*Summary:* ' + striptags(episode.summary);
     }

     tvBot.postMessageToChannel('general', res)

   } else {
     tvBot.postMessageToChannel('general', "Sorry, I couldn't find that tvshow")
   }
  }

  request(reqUrl, postShow)
}




module.exports = lol;
