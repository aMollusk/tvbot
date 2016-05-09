

module.exports = {

  filterString: function(message, command) {

      console.log('more')
      var indexOfCommand = message.indexOf(command) + command.length;
      var tvShow = message.slice(indexOfCommand + 1, message.length)

      tvShow = tvShow.replace(/\s+/g, '-')
      console.log(tvShow)

      return {
        tvShow,
        command
      }
  },

  findNext: function(episodes) {
    var nextEpFound = false;
    var currentDate = new Date();

    var x = episodes.length;

    do {
      x--;
      console.log(x)
      var episodeDate = new Date(episodes[x].airdate)
      if(currentDate >= episodeDate) {
          nextEpFound = true;
      }
    } while(!nextEpFound && x > -1)

    // TODO return a value to say that there are no more episodes to compare
    return episodes[x]
  }


}
