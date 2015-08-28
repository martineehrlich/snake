(function () {
  if (typeof Game === "undefined") {  window.Game = {}; }

  var View = Game.View = function ($el) {
    this.$el = $el;
    this.head = null;
    this.board = new Game.Board(20);
    this.setupGrid();
    this.gamePaused = false;
     $(window).on("keydown", this.handleKey.bind(this));
     this.intervalId = window.setInterval(
     this.step.bind(this),
     View.STEP_MILLIS
   );

  };
    View.STEP_MILLIS = 100;

    View.prototype.pause = function () {
      if (this.gamePaused === false) {
        window.clearTimeout();
        this.gamePaused = true;
  } else {
        window.setTimeout(this.step(), 1000 / 30);
        this.gamePaused = false;
  }
  };

  View.prototype.handleKey = function (event) {
   if (View.KEYS[event.keyCode]) {
     this.board.snake.turn(View.KEYS[event.keyCode]);
    }
    if  (event.keyCode === 32) {
      this.pause();
     }
   };

  View.KEYS = {
     38: "N",
     39: "E",
     40: "S",
     37: "W",
   };

   View.prototype.render = function () {
    this.updateClasses([this.board.apple.position], "apple", this.board.snake.dir);
    this.updateClasses(this.board.snake.segments, "snake", this.board.snake.dir);
   if(this.board.snake.head()){
     this.updateClasses([this.board.snake.head()], "head", this.board.snake.dir);
   }
   if(this.board.snake.tail){
   this.updateClasses([this.board.snake.tail], "tail", this.board.snake.dir);
  }
   $score = $(".score");
   $score.html(this.board.snake.points);
 };

 View.prototype.setupGrid = function () {
   var html = "";

   for (var i = 0; i < this.board.dim; i++) {
     html += "<ul>";
     for (var j = 0; j < this.board.dim; j++) {
       html += "<li></li>";
     }
     html += "</ul>";
   }

   this.$el.html(html);
   this.$li = this.$el.find("li");
 };

 View.APPLE_COLORS = ["red", "purple", "yellow", "green", "blue"];

 View.prototype.getRandomArbitrary = function (min, max) {
   return Math.floor(Math.random() * (max - min) + min);
 };

 View.prototype.updateClasses = function(coords, className, data) {
   this.$li.filter("." + className + ".N").removeClass();
   this.$li.filter("." + className + ".S").removeClass();
   this.$li.filter("." + className + ".E").removeClass();
   this.$li.filter("." + className + ".W").removeClass();
   coords.forEach(function(coord){
     var flatCoord = (coord.i * this.board.dim) + coord.j;
     this.$li.eq(flatCoord).addClass(className);
     this.$li.eq(flatCoord).addClass(data);
    //  if(className === "apple"){
    //    var num = this.getRandomArbitrary(0, 5);
    //    var color = View.APPLE_COLORS[num];
    //    this.$li.eq(flatCoord).css("background-color", color);
    //  }
   }.bind(this));
 };

 View.prototype.addRetryButton = function () {

   $(".retry").removeClass("hidden");
  //  this.retry();
 };

  View.prototype.retry = function () {
    $retry = $(".retry");
    $retry.onclick(function () {
      alert("hello");
    });
  };


 View.prototype.step = function () {
   if (this.board.snake.segments.length > 0) {
     this.board.snake.move();
     this.render();
   } else {
     window.clearInterval(this.intervalId);
   }
 };

})();
