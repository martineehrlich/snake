# Snake
This is a version of the classic arcade game, Snake, built with JavaScript, jQuery, HTML, and CSS.

To play, [click here!][site]

[site]: http://martineehrlich.github.io/snake/html/index.html

![snake]


## Implementation

### jQuery
jQuery is used to:
  * Add and remove classes to HTML elements to change the colors of the snake.
  * Listen to key press events to change the direction of the snake and pause the game
  * Listen for click events that show or hide HTML elements.

### Coordinates
To keep track of the the location of the snake and apple, I created a coordinate class. Every segment of the snake and the apple are stored in the board as coordinates. In the view, each coordinate is attributed to an HTML element on the board.






[snake]: ./pictures/snake.gif
