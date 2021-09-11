/*
`Function.prototype.apply()` calls a function with a given `THIS` value,
and `arguments` provided as an array.

When calling an existing function, `this` refers to the current
object (the calling object). With `apply` you can write a method
once, and then inherit it in another object, without having to
rewrite the method for a new object.

Beware by using apply, you run the risk of exceeding the js engine's
argument length limit. The consequences varies across angines.
Js core engine has hard-coded argument limit of 65536.
 */

const numbers = [5,6,2,3,7];

const max = Math.max.apply(null, numbers); // 7

