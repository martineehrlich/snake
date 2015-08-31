(function () {
  if (typeof Game === "undefined") {  window.Game = {}; }


  var Coord = Game.Coord = function (i, j){
    this.i = i;
    this.j = j;
  };

  Coord.prototype.plus = function (coord) {
    return new Coord(this.i + coord.i, this.j + coord.j);
  };

  Coord.prototype.equals = function (coord) {
    return this.i == coord.i && this.j == coord.j;
  };

  Coord.prototype.isOpposite = function (coord) {
    return (this.i == (-1 * coord.i)) && (this.j == (-1 * coord.j));
  };

  var Snake = Game.Snake = function (board) {
    this.dir = 'N';
    this.board = board;
    this.turning = false;
    var startCoord = new Coord(Math.floor(this.board.dim/2), Math.floor(this.board.dim/2));
    this.segments = [startCoord];
    this.growTurns = 0;
    this.points = 0;
    this.tail = [];
  };

  Snake.DIFFS = {
    "N": new Coord(-1, 0),
    "S": new Coord(1, 0),
    "E": new Coord(0, 1),
    "W": new Coord(0, -1)
  };


  Snake.prototype.head = function () {
    return this.segments[this.segments.length -1];
  };

  var Board = Game.Board = function (dim) {
    this.dim = dim;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  };

  Board.prototype.validPosition = function (coord) {
   return (coord.i >= 0) && (coord.i < this.dim) &&
     (coord.j >= 0) && (coord.j < this.dim);
 };

 Snake.prototype.oppositeDir = function () {
     if(this.dir === "N"){
       return "S";
     } else if (this.dir === "S") {
       return "N";
     } else if (this.dir === "W") {
       return "E";
     } else {
       return "W";
     }
 };

  Snake.prototype.move = function () {

      // move snake forward
      this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));

      // allow turning again
      this.turning = false;

      // maybe eat an apple
      if (this.eatApple()) {
        this.board.apple.replace();
      }

      // if not growing, remove tail segment
      if (this.growTurns > 0) {
        this.growTurns -= 1;
      } else {
        this.segments.shift();
      }

      if (!this.isValid()) {
        this.segments = [];
      }

      this.tail = this.segments[0];

    };

  Snake.prototype.turn = function (dir) {
    if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]) ||
     this.turning) {
     return;
   } else {
     this.turning = true;
     this.dir = dir;
   }
  };


  Snake.prototype.isValid = function () {
    var head = this.head();

    if (!this.board.validPosition(this.head())) {
      return false;
    }
    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }

    return true;
  };

  var Apple = Game.Apple = function (board) {
    this.board = board;
    this.replace();
  };

  Apple.prototype.replace = function () {
   var x = Math.floor(Math.random() * this.board.dim);
   var y = Math.floor(Math.random() * this.board.dim);

  //  // Don't place an apple where there is a snake
   while (this.board.snake.isOccupying([x, y])) {
     x = Math.floor(Math.random() * this.board.dim);
     y = Math.floor(Math.random() * this.board.dim);
   }

   this.position = new Coord(x, y);
 };

 Snake.prototype.isOccupying = function (array) {
    var result = false;
    this.segments.forEach(function (segment) {
      if (segment.i === array[0] && segment.j === array[1]) {
        result = true;
        return result;
      }
    });
    return result;
  };

  Snake.prototype.eatApple = function () {
    if (this.head().equals(this.board.apple.position)) {
      this.growTurns += 3;
      this.points += 10;
      return true;
    } else {
      return false;
    }
  };



})();
