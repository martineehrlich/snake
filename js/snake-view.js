(function () {
  if (typeof Game === "undefined") {  window.Game = {}; }

  var View = Game.View = function ($el) {
    this.$el = $el;
    this.board = new Game.Board(20);
    this.highScore = 0;
    this.opening();
  };

  View.prototype.opening = function () {
    this.head = null;
    this.gamePaused = false;
    this.setupGrid();
    var $opening = $('.opening');
    $opening.removeClass("hidden");
    $('button').removeClass("active");
    $('button').click(function(event) {
      $('button').unbind('click');
      var difficulty = event.target.className;
      $difficulty = $(event.target);
      $difficulty.addClass("active");
      this.difficulty = difficulty;
        $start = $('.start');
        $start.removeClass("hidden");
        this.StartButton();
    }.bind(this));
  };

  View.prototype.StartButton = function () {
    $(".start").click(function(event){
      $opening = $('.opening');
      $start = $('.start');
      $opening.addClass('hidden');
      $start.addClass("hidden");
      this.startGame();
    }.bind(this)
  );

  };

  View.prototype.restart = function() {
    debugger;
   $(window).off();
   this.board = new Game.Board(20);
   this.opening();
 };

  View.prototype.startGame = function (difficulty) {
    $(window).on("keydown", this.handleKey.bind(this));
    this.intervalId = window.setInterval(
    this.step.bind(this),
    View[this.difficulty]
    );
  };

  View.DIFFICULTY = {"easy": 100, "medium": 60, "hard": 30 };


  View.prototype.handleKey = function (event) {
   if (View.KEYS[event.keyCode]) {
     this.board.snake.turn(View.KEYS[event.keyCode]);
    }
    if (event.keyCode === 80) {
      this.togglePause();
     }
   };

  View.KEYS = {
     38: "N",
     39: "E",
     40: "S",
     37: "W",
   };

   View.prototype.render = function () {
    this.updateClasses([this.board.apple.position], "apple", this.board.snake.dir, "");
    if(this.board.snake.head()){
      this.updateClasses([this.board.snake.head()], "head", this.board.snake.dir, "");
    }
    this.updateClasses(this.board.snake.segments, "snake", this.board.snake.dir, "test");

   $score = $(".score");
   $score.html(this.board.snake.points);
   $highscore = $(".highscore");
   this.updateHighScore(this.board.snake.points);
   $highscore.html(this.highScore);

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

 View.prototype.togglePause = function () {
    if (this.gamePaused) {
      $('.pause').removeClass('active');
      this.gamePaused = false;
      this.intervalId = window.setInterval(
        this.step.bind(this),
        View.DIFFICULTY[this.difficulty]
      );
    } else {
      $('.pause').addClass('active');
      this.gamePaused = true;
      window.clearInterval(this.intervalId);
    }
  };

  View.prototype.updateHighScore = function(score) {
    if (this.highScore) {
      if (score > this.highScore) {
        this.highScore = score;
      }
    } else {
      this.highScore = score;
    }
  };

  View.prototype.startGame = function(difficulty) {
    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.DIFFICULTY[this.difficulty]
    );
    $(window).on("keydown", this.handleKey.bind(this));
  };

 View.APPLE_COLORS = ["red", "purple", "yellow", "green", "blue", "turquiose", "orange", "teal"];

 View.prototype.getRandomArbitrary = function (min, max) {
   return Math.floor(Math.random() * (max - min) + min);
 };

 View.prototype.updateClasses = function(coords, className, data, data2) {
   this.$li.filter("." + className + ".N.test").removeClass();
   this.$li.filter("." + className + ".S.test").removeClass();
   this.$li.filter("." + className + ".E.test").removeClass();
   this.$li.filter("." + className + ".W.test").removeClass();
   this.$li.filter(".test").css("background-color", "");
   coords.forEach(function(coord){
     var flatCoord = (coord.i * this.board.dim) + coord.j;
     this.$li.eq(flatCoord).addClass(className);
     this.$li.eq(flatCoord).addClass(data);
     this.$li.eq(flatCoord).addClass(data2);
     if(className === "snake"){
       var num = this.getRandomArbitrary(0, 8);
       var color = View.APPLE_COLORS[num];
       this.$li.eq(flatCoord).css("background-color", color);
     }
   }.bind(this));
 };

  View.prototype.retry = function () {
    $retry = $(".retry");
    $retry.onclick(function () {
      this.addRetryButton();
    }.bind(this));
  };

  View.prototype.gameOver = function($el) {
      var $gameOver = $('.gameover');
      $gameOver.removeClass('hidden');
      $gameOver.find('.retry').click(function() {
        $gameOver.addClass('hidden');
        this.restart();
      }.bind(this));
    };

 View.prototype.step = function () {
   if (this.board.snake.segments.length > 0) {
     this.board.snake.move();
     this.render();
   } else {
     this.gameOver(this.$el);
     window.clearInterval(this.intervalId);
   }
 };

})();
