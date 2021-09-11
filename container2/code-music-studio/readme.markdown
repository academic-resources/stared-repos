# code-music-studio

design musical algorithms

[live demo at studio.substack.net](http://studio.substack.net/)

![screenshot](images/screenshot.png)

# usage

```
code-music-studio

  Run the code-music-studio http server.

  -p PORT      Listen on this port.
  -d DATADIR   Use this directory to store songs.
  -i           Read lines of json from stdin to set state variables.
  --state.VAR  Set initial variables individually.

```

# install

With [npm](https://npmjs.org) do:

```
npm install -g code-music-studio
```

# run

Just type:

```
code-music-studio PORT
```

to start the server on PORT.

# songs

Songs look like:

``` js
return function (t) {
  return sin(440)
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}
```

The returned function gets run 44000 times per second and returns a
floating point number between -1 and 1 representing the amplitude.

# input

If `-i` is given, stdin is parsed as newline-separated json. Each line of
json updates the current state.

For example, the left column is the input and the right column is the value
of the current state:

```
input           state

{"x":3}         {x:3}
{"y":4}         {x:3,y:4}
{"x":5}         {x:5,y:4}
{"y":8,"z":2}   {x:5,y:8,z:2}
```

You can set the initial state value with `--state`:

```
code-music-studio -i --state.x=5 --state.y=3
```

You can get at the state variables in the second argument to the function:

```
return function (t, state) {
  return sin(440 * state.x)
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}
```

# license

MIT
