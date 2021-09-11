# Compute the Expensive Sequence

It's like the Fibonacci Sequence, but a lot more computationally
expensive and a lot less useful.

```
exps(x, y, z) =
     if x <= 0: y + z
     if x >  0: exps(x-1,y+1,z) + exps(x-2,y+2,z*2) + exps(x-3,y+3,z*3)
```

`x`, `y`, and `z` are all greater than or equal to zero.

This will be tested on inputs as large as:

```
x = 150
y = 400
z = 800
```

Use a hashtable to make sure your solution completes before the universe
ends.

Hint: Va Clguba, n qvpg xrl pna or nal vzzhgnoyr glcr... vapyhqvat n
ghcyr.


(That's encrypted with ROT13--Google `rot13 decoder` to decode it if you
want the hint.)