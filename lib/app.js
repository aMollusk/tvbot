'use strict'

var util = require('util');
var path = require('path');
var fs = require('fs');
var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');



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

module.exports = lol;
