var assert    = require('assert');
var challenge = require('code-challenge');

/**
 * Set the challenge name.
 *
 * @type {String}
 */
challenge.name = 'N-Queens';

/**
 * Print generic solution text for solving the N-{Queens,Rooks}.
 *
 * @type {String}
 */
var SOLUTION_TEXT =  'To work on a solution you will need to create a file ' +
  'in your preferred language. The number of possible solutions should be ' +
  'logged to stdout and once you think you have the answer, use ' +
  '`challenge verify [file]` to pass the exercise.';

/**
 * Add an exercise for 4 rooks.
 */
challenge.exercise('4 Rooks')
  .add('print', function () {
    console.log(
      'N-Rooks is a problem that involves placing N rooks on a NxN chess ' +
      'board. One potential solution on a 4x4 board is:'
    );
    console.log();
    console.log('R . . .');
    console.log('. R . .');
    console.log('. . R .');
    console.log('. . . R');
    console.log();
    console.log(SOLUTION_TEXT);
  })
  .add('verify', function () {
    return challenge.execFile(this._[0])
      .spread(function (stdout) {
        assert.equal(stdout.trim(), '24');
      });
  });

/**
 * Add an exercise for 8 rooks.
 */
challenge.exercise('8 Rooks')
  .add('print', function () {
    console.log(
      'N-Rooks is a problem that involves placing N rooks on a NxN chess ' +
      'board. One potential solution on a 8x8 board is:'
    );
    console.log();
    console.log('R . . . . . . .');
    console.log('. R . . . . . .');
    console.log('. . R . . . . .');
    console.log('. . . R . . . .');
    console.log('. . . . R . . .');
    console.log('. . . . . R . .');
    console.log('. . . . . . R .');
    console.log('. . . . . . . R');
    console.log();
    console.log(SOLUTION_TEXT);
  })
  .add('verify', function () {
    return challenge.execFile(this._[0])
      .spread(function (stdout) {
        assert.equal(stdout.trim(), '40320');
      });
  });

/**
 * Add an exercise for 4 queens.
 */
challenge.exercise('4 Queens')
  .add('print', function () {
    console.log(
      'N-Queens is a problem that involves placing N queens on a NxN chess ' +
      'board. One potential solution on a 4x4 board is:'
    );
    console.log();
    console.log('. Q . .');
    console.log('. . . Q');
    console.log('Q . . .');
    console.log('. . Q .');
    console.log();
    console.log(SOLUTION_TEXT);
  })
  .add('verify', function () {
    return challenge.execFile(this._[0])
      .spread(function (stdout) {
        assert.equal(stdout.trim(), '4');
      });
  });

/**
 * Add an exercise for 8 queens.
 */
challenge.exercise('8 Queens')
  .add('print', function () {
    console.log(
      'N-Queens is a problem that involves placing N queens on a NxN chess ' +
      'board. One potential solution on a 8x8 board is:'
    );
    console.log();
    console.log('. . . . . Q . .');
    console.log('. . . Q . . . .');
    console.log('. . . . . . Q .');
    console.log('Q . . . . . . .');
    console.log('. . . . . . . Q');
    console.log('. Q . . . . . .');
    console.log('. . . . Q . . .');
    console.log('. . Q . . . . .');
    console.log();
    console.log(SOLUTION_TEXT);
  })
  .add('verify', function () {
    return challenge.execFile(this._[0])
      .spread(function (stdout) {
        assert.equal(stdout.trim(), '92');
      });
  });
