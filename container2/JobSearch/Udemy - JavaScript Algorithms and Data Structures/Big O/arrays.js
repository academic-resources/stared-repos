// Arrays - Ordered Lists

let names = ["Michael", "Melissa", "Andrea"]
let values = [ture, {}, [], 2, "awesome"]

// When to use Arrays
// - When you need order
// - When you need access / insertion and removal (sort of...)
// Big O of Arrays
// - Insertion - it depends...
//  - At the end/top of an array O(1)
//  - Anywhere else, O(n - index)
// - Removal - it depends...
//  - Same as above
// - Searching - O(n)
// - Access - O(1)
// Big O of Array.methods
// - push - O(1)
// - pop - O(1)
// - shift - O(n)
// - unshift - O(n)
// - concat - O(n)
// - slice - O(n)
// - splice - O(n)
// - sort - O(n log(n))
// - forEach/map/filter/reduce/etc. = O(n)