(function () {
  if (typeof Game === "undefined") {  window.Game = {}; }


var Coord = Game.Coord = function (x, y) {
  this.x = x;
  this.y = y;
};

Coord.prototype.plus = function (x, y) {
  new Coord (this.x + x, this.y + y);
};

Coord.prototype.equals = function (x, y) {
  return (this.x === x && this.y === y) ;
};


var Snake = Game.Snake = function (board) {
  this.grid = board;
  this.dir = 'N';
  var startingCoord = Coord(board.dim/2, board.dim/2);
  this.segments = [startingCoord];
};


Snake.prototype.move = function () {
  this.segments.forEach(function(segment) {
    segment.plus(Snake.DIFFS[this.dir]);
  }.bind(this));
};

Snake.prototype.turn = function (dir) {
  this.dir = dir;
};

Snake.DIFFS = {
  "N": new Coord(-1, 0),
  "E": new Coord(0, 1),
  "S": new Coord(1, 0),
  "W": new Coord(0, -1)
};


  Board.blankGrid = function (dim) {
    var grid = [];

    for (var i = 0; i < dim; i++) {
      var row = [];
      for (var j = 0; j < dim; j++) {
        row.push("o");
      }
      grid.push(row);
    }

    return grid;
  };

  var Board = SG.Board = function (dim) {
   this.dim = dim;
   this.snake = new Snake(this);

 };

  Board.render = function () {
    var newBoard = new Board.blankGrid (this.dim);
    this.snake.segments.forEach(function(segment){
      this.board[segment[0]][segment[1]] = "X";
    }.bind(this));

    newBoard.map(function (row) {
      return row.join("");
    }).join("\n");
  };


})();
