// Set variables
var sequence = [1, 2, 3, 4];
var player = [];
var strict = false;
var round = 0;
var speed = 600;

// Power Button
$('.power-button').on('click', function() {
  $(this).toggleClass('float-left float-right');
  //$(this).hasClass('float-right') ? on() : off();
  NewRound(sequence, speed);
});

// Strict Button
$('.strict-button').on('click', function() {
  $(this).toggleClass('brighten');
  $(this).hasClass('brighten') ? strict = true : strict = false;
  console.log(strict);
});

// Start Button
$('.start-button').on('click', function() {
  $(this).toggleClass('brighten');
});

// Handling tiles
$('.tiles').on('click', function() {
  $(this).toggleClass('brighten');
});

function NewRound(sequence, speed) {
  // Adds new random color and sends the sequence to be animated
  var color = getColor(4);
  sequence.push(color);
  console.log(sequence);

  //Must increase speed on 5th, 9th and 13th round
  animate(sequence, speed);
}

function animate(sequence, speed) {
  var i = 0;
  var interval = setInterval(function() {
    LightUp(sequence[i]);

    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
    }
  }, speed);
}

function LightUp(tile) {
  // body...
  var $tile = $('[data-tile=' + tile + ']').addClass('brighten');
  window.setTimeout(function() {
    $tile.removeClass('brighten');
  }, 300);
}

function getColor(num) {
  /* Generate a random number between 1 and 4
  Green: 1   Red: 2   Blue: 3   Yellow: 4
  */
  return Math.floor(Math.random() * num) + 1;
}
