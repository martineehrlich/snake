(function () {
  if (typeof Game === "undefined") {  window.Game = {}; }


var View = Game.View = function ($el) {
  this.$el = $el;
  this.board = Game.Board.blankGrid(25);
  this.createBoard();

  this.board.render();
};

View.createBoard = function () {
  var $div = $("<div></div>");
  for (var i = 0; i < this.board.dim; i++) {
    var $ul = $("<ul></ul>");
    for (var j = 0; i < this.board.dim; j++) {
      $ul.append("<li></li>") ;
    }
  }
};

})();
