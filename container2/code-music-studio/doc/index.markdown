Make music with algorithms!

# javascript

In code-music-studio, you make music with a language called javascript.
javascript is a computer programming language that your web browser understands.

Computer programming is 

If you press `ctrl+shift+j` in chrome or `ctrl+shift+k` in firefox, you will
open up a debugger. The debugger is like a calculator: when you type an
expression like `3+4`, on the next like you get the answer: `7`:

    > 3+4
    7

The debugger is a good way to test out small snippets of code to make sure they
do what you want them to do before you put those snippets into your music.

Try things and see what happens!

## variables

To store a value in a variable you can do:

```
var x = 5 + 2
```

## arithmetic

The arithmetic in javascript works similarly but slightly different from
mathematical notation or some calculators.

The arithmetic operators you might already be familiar with should all mostly
work:

* `*` - multiply
* `/` - divide
* `+` - add
* `-` - subtract
* `%` - modulo

Unlike mathematical notation, you can't use parenthesis to mean multiplication:

```
(x + 1)(x)
```

You will need to use `*` instead:

```
(x + 1) * x
```

Modulo is like division, but only returns the remainder as an integer. For
example:

```
> 9 % 4
1
> 6 % 3
0
> 5006 % 10
6
```

Modulo is very useful for generating procedural music.

## built-ins

These built-ins functions will be useful for making music:

* `Math.sin(x)` - return the sine of `x`, an angle measure in radians. Radians
are like degrees except instead of going from 0 to 360 they go from 0 to 2 PI,
or 0 to about 6.28.
* Math.PI

## learn more

[http://jsforcats.com/](http://jsforcats.com/) is a great friendly resource for
learning more about javascript.

# waves

Music is just made of waves!

In code-music-studio, you write a function in javascript that takes a parameter
`t`, time in seconds, and returns an amplitude of a wave between -1 and 1.

For example, this program will play a sine wave at 440 Hz, or middle A:

```
return function (t) {
  return Math.sin(2 * Math.PI * t * 440);
};
```

Copy paste this snippet into the editor and try it out! Make changes to see
what happens.

Try some other [musical note
frequencies](http://www.phy.mtu.edu/~suits/notefreqs.html) instead of 440.

## sine waves

In the previous example, we created a sine wave. Sine waves fluctuate smoothly
over time but aren't very loud.

You'll probably want to make a function so you can do `sin(440)` instead of
writing out `Math.sin(2 * Math.PI * t * 440)` every time.

```
return function (t) {
  return sin(440);
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
};
```

## square waves

Square waves are like sine waves but they change abruptly instead of smoothly. A
square wave can be defined in terms of a sine wave by checking whether the sine
result is above or below 0 and returning 1 or -1 only.

```
return function (t) {
  return square(440);
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function square (x) { return sin(x) > 0 ? 1 : -1 }
};
```

## sawtooth waves

Sawtooth waves are a jagged-looking wave like the teeth of a saw. Here is a
function that can generate a sawtooth wave:

``` js
return function (t) {
  return saw(440);
  function saw (x) { return 1-2*(t%(1/x))*x }
};
```

# composing sounds

Now that we have some types of waves, we can compose them together with `+`!

For example to hear a medium and a high sound together, just add the waves
together in the output:

``` js
return function (t) {
  return (sin(441)+sin(5000))/2;
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}
```

You'll want to divide by 2 because otherwise your sine waves will start to clip
and more resemble square waves as they transition more abruptly and less
smoothly.

You can chain together as many sounds as you want at a time using just addition!

# melody

To generate a melody, you can create an array outside of your main program with
a list of frequencies and then index that array with the floor of the time
modulo the melody length to create a repeating melody:

``` js
var melody = [ 200, 240, 360, 340, 180, 190 ];
return function (t) {
  var m = melody[Math.floor(t*2) % melody.length];
  return sin(m)*2;
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}
```

Another trick you can do is instead of encoding frequencies manually, you can
use how western music works on 12-tone tonality on powers of 2 to just encode
note integers instead:

```
var melody = [ 0, 3, 10, 9, -2, -1 ];

return function (t) {
  var m = Math.pow(2, melody[Math.floor(t*2) % melody.length] / 12);
  return sin(m * 200)*2;
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}
```

# rhythms

There are many tricks to create repeating patterns to set a rhythm for your
music.

## pulse

If you have two sine waves that close together in frequency, they will create a
beat that repeats at the inverse of their difference. For example:

``` js
return function (t) {
  return (sin(800) + sin(801)) / 2;
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}
```

will repeat every second: `1 / (801 - 800) = 1`

Waves at 800 and 804 will pulse 4 times per second.

Try it out for yourself!

## multiply

One trick for a simple frequency is to multiply a sine wave times another sine
wave with a much lower frequency. For example, this program pulses a sine wave
at middle A 4 times per second:

``` js
return function (t) {
  return sin(441) * sin(4);
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}
```

or you can create neat patterns by adding sine waves together, creating
interference patterns:

``` js
return function (t) {
  return sin(441) * (sin(3) + sin(4)) / 2;
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}
```

## noise

Another way to create simple beats is to turn on a noise function at a regular
interval.

You can obtain random values between 0 and -1 with `Math.random()`. Random noise
sounds like static on a pre-digital radio or old television set:

``` js
return function (t) {
  return 2*Math.random()-1
}
```

You can chop up those segments

``` js
return function (t) {
  return drums();
  function drums () { return t % (1/2) < 1/16 ? 2*Math.random()-1 : 0 }
}
```

# more examples

## plucky

This example is a simple repeating baseline that plucks a string twice a second.

``` js
return function (t, i) {
  return pluck(t % 0.5, 100, 10, 10);
}

function pluck (t, freq, duration, steps) {
    var n = duration;
    var scalar = Math.max(0, 0.95 - (t * n) / ((t * n) + 1));
    var sum = 0;
    for (var i = 0; i < steps; i++) {
        sum += Math.sin(2 * Math.PI * t * (freq + i * freq));
    }
    return scalar * sum / 6;
}
```

Here are some more:

* [callaback](http://studio.substack.net/callaback)
* [clown](http://studio.substack.net/clown)
* [chirp](http://studio.substack.net/chirp)
* [ringer](http://studio.substack.net/ringer)
* [beep-boop](http://studio.substack.net/beep-boop)
