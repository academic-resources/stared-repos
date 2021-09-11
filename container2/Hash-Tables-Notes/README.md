# Hash-Tables-Notes

[Lecture 1: How Arrays Work](#Lecture-I)  

a. [Arrays](#Arrays)  
b. [Arrays.py](#Arrays.py)  
c. [Resizing Arrays](#Resizing-Arrays)  
d. [Read Arrays](#Read-Arrays)  
e. [Insert Into Arrays](#Insert-Into-Arrays)  
f. [Append to Arrays](#Append-to-Arrays)  
g. [Remove from an Array](#Remove-from-an-Array)  
h. [Pop Arrays](#Pop-Arrays)  
i. [Doubly Linked Lists](#Doubly-Linked-Lists)  
j. [Hash Tables](#Hash-Tables)  
k. [Additional Resources](#Lecture-I-Additional-Resources)  

<br>

[Lecture 2: Hash Tables](#Lecture-II)  

a. [Basic Hashtable](#Basic-Hashtable)  
b. [dbj2](#dbj2)  
c. [Collisions](#Collisions)  
d. [Building a Hash Table](#Hash-Table)  
e. [Retrieval](#Retrieval)  
f. [Remove](#Remove)  
g. [Alternate Solutions](#Alternate-Solutions)


<br>
<br>

If you found these notes helpful and want to show appreciation to the author, [coffee donations](https://www.buymeacoffee.com/G1stPBuYU) are much loved.  


# Lecture I

[Lecture I Recording](https://www.youtube.com/watch?v=MOonWip19TM&feature=youtu.be)

## Arrays

What is an array and how do they work?  

- They have a fixed length/size  
- A sequence of contiguous objects of the same type, storing data  
- Index based with a value  
- Time and Space efficient  
- Fast at inserting to the end, slow at inserting to the beginning (because all objects in the array are shifted one space to the right if there is available space OR a new copy of the array is made if there is no available space) 

<br>

> 01 01 was a race horse  
> 10 10 was one too  
> 01 01 won one race  
> 10 10 01 01 10  

<br>
An array allocates a certain amount of memory when they are created.  

Array lookup begins at `[0]` because it's zero pointer sizes away from the pointer at the beginning of the sequence. While it's harder for people, it's easier for computers to do the math.   

> Index * size of type = array[index]  

So, 0 * 4 bits = 0. If we started with 1 instead of 0, that would require an additional operation to find the starting point beause 1 * 4 = 4, not 0.  

array[5] would point to the 20th bit because 5 * 4 = 20.  

If we know that we want an array of 3, 12 bits of memory will be set aside for this array (3 * 4 = 12).  

If we want to decrease the size of that array, we can easily indicate that the memory for that array is _less_ than 12 bits.  

But if we want to _add_ to the array, we have to first check _if_ the memory next to the end of the current array is already allocated.  

<br>

If that memory is not already allocated, we can use it to expand the array. But if it is taken, how do we expand the array?  

Because arrays must be contiguous (unlike linked lists), we can't just allocate the next closest available bits of memory.

Depending on if the language manages memory for us (like Python), we may have to do this manually.  

We first would need to find a larger memory block that fits the new array length, then copy the original array data into that new memory block. Afterwards, we release the original block of memory by marking it as free (or able to be collected by the garbage collector).  

<br>

Typically that data is not actually cleared. It's just marked as free to re-use. When we get rid of old hard drives or other memory storage devices, it's best to fully destroy anything that contained sensitive data because it may still be written to memory if it was not memory that was cleared to re-use. De-allocation is not the same as erasing, despite being "deleted" according to the computer.  

Not all languages de-allocate automatically. In Python it does, but in C, you have to do it manually (or risk a memory leak).  

<br>


## Arrays.py

Let's dive into writing code. We'll use the `arrays.py` file in the [Hash Tables Repo](https://github.com/LambdaSchool/Hash-Tables) -- copied into this repo for simplification.  

> Do not use any of the built in array functions for this exercise

We want to avoid using the magically built in functions that make for cool one liner solutions, in order to fully understand what's happening under the hood.

We'll start with our constructor:

```
class array:
    def __init__(self):
        # Your code here
        pass
```

We're going to also create functions that allow us to resize, remove, pop, add to the array, and more.  

<br>

>_(Due to losing the C curriculum, we will not discuss memory management because Python does it automatically -- but if you learn C, you need to learn how to handle memory.)_  

<br>

What do we need to add to our array constructor to make it work?  

We need to know how much memory to allocate for the array (capacity). Capacity will be passed in and is the "maximum" size that the array _could_ become.  

We also need the actual current size, which begins at 0 when an array is initialied.  

Lastly, we need the elements (buckets of actual memory) that will start out with nothing (`none`) in them. 

```
class array:
    def __init__(self, capacity):
        # We need to set the capacity
        self.capacity = capacity # Maximum size the array can become

        # We also need the actual current size
        self.count = 0 # Current size being used

        # We need to create the empty cells within the block of memory
        self.elements = [None] * capacity
```

<br>
<br>

## Resizing Arrays

If we want to increase the size of the array, it's best practice to simply _double_ it. But why? Why not just add one bit of memory?  

This makes the frequency of needing to change the size less often.  

Isn't that wasteful of memory? Doubling increases in size very quickly. But memory is cheap, while computational processing is expensive. If we give up memory to reduce processing expense, that's a valuable trade off.   

<br>

Typically we re-allocate memory, not when the memory is full, but usually at a cap around 70-80% full preventatively.  

To double the array size...

```
def resize_array(array):
    # Double the old capacity
    new_capacity = array.capacity * 2

    # Re-allocate the memory
    new_elements = [None] * new_capacity

    # Copy the elements over
    # We use count instead of capacity because we only need to do it for the memory actually being used
    for i in range(array.count):
        new_elements[i] = array.elements[i]

    # Copy over our changes
    array.elements = new_elements
    array.capacity = new_capacity
```

<br>
<br>

## Read Arrays

Now we need to write a function for reading an array, by finding the value of a certain index.  

The first thing to check though is to make sure that the index exists within the array by testing the boundaries.  

We need to make sure that the index is not outside of `0` to `array.count`.  

```
# Return an element of a given array at a given index
def array_read(array, index):
    # Throw an error if array is out of the current count
    # Why? To recognize an out of bounds exception

    # How do we know if we're out of bounds?
    if index > array.count:
        print("Error: out of bounds")
        return None
    
    # Otherwise, return the index value
    return array.elements[index]
```

<br>
<br>


## Insert Into Arrays

Next, we want to write a function that inserts data into an array.  

We'll start by using the same error handling as before to ensure that we're in range, but removing the `>=` in favor of just `>` to avoid looking outside of the array.

<br>

```
def array_insert():
    # Throw an error if array is out of the current count
    if index >= array.count:
        print("Error: out of bounds")
        return None

    # Resize the array if the number of elements is over capacity

    # Move the elements to create a space at 'index'
    # Think about where to start!

    # Add the new element to the array and update the count
    pass
```

<br>

How will we resize the array? First we check to see if the number of elements is greater than the capacity.  

We could check if `array.count >= array.capacity` OR if `array.count >= array.capacity * 0.80` -- to proactively prevent it from nearing capacity.

But today we'll check if `array.capacity <= array.count` and double the array if that condition is hit:  

<br>

```
def array_insert(array, index):
    # Throw an error if array is out of the current count
    if index > array.count:
        print("Error: out of bounds")
        return None

    # Resize the array if the number of elements is over capacity
    if array.capacity <= array.count:
        # Create a new array that is doubled in size with our previously written resize_array function
        resize_array(array)

    # Move the elements to create a space at 'index'
    # Think about where to start!

    # Add the new element to the array and update the count
    pass
```
<br>

Next we need to move the elements one space to the right, to create a space at index. We can use a `for in range` loop that allows us to use `start, stop[ step]` so we can start at the _end_ of the loop to create a space for each previous element.  

> 22, 34, 76, 43, 82, 91, xx, xx, xx  

We can see our array above has 3 spare spaces at the end of the allocated memory. Our loop would look like:

> 22, 34, 76, 43, 82, xx, 91, xx, xx  
> 22, 34, 76, 43, xx, 82, 91, xx, xx  
> 22, 34, 76, xx, 43, 82, 91, xx, xx  

And so on until we get to the index where the new element is being inserted.  
<br>

```
# Move the elements to create a space at 'index'

# Everything to the right of index needs to move a space to the right

for i in range(array.count, index, -1):
    array.elements[i] = array.elements[i-1]
```

<br>

This is a rare time where we can use `array.count` not `array.count - 1` because we _do_ want to move everything over one to the right.

Lastly, we'll add in the new element to the indicated index and adjust the `array.count`:

<br>

```
def array_insert(array, element, index):
    # Throw an error if array is out of the current count
    if index > array.count:
        print("Error: out of bounds in array_insert")
        return None

    # Resize the array if the number of elements is over capacity
    if array.capacity <= array.count:
        # Create a new array that is doubled in size with our previously written resize_array function
        resize_array(array)

    # Move the elements to create a space at 'index'
    # Everything to the right of index needs to move a space to the right
    for i in range(array.count, index, -1):
        array.elements[i] = array.elements[i-1]

    # Add the new element to the array and update the count
    array.elements[index] = element
    array.count += 1
```
<br>
<br>

## Append to Arrays

Rather than build this function again, we can use the insert method that we've already built.

Looking at this example again, where is index of `array.count`?

> 22, 34, 76, 43, 82, 91, xx, xx, xx 

It would be the blank spot after 91 because array index starts at 0. So array[6] is `xx` not `91`. If we want to add to the end of the array, we'll use `array.count`:

<br>

```
# Add an element to the end of the given array
def array_append(array, element):

    # Hint, this can be done with one line of code
    # (Without using a built in function)

    array_insert(array, element, array.count)
```

<br>
<br>

## Remove from an Array

Now we want to remove an element from the array but only IF it exists. We need to throw an error if it does not.  

We can use a for loop to check each value in the array. But what do we do if we find the element?

<br>

```
def array_remove(array, element):
    for i in range(array.count):
        if array[i] == element:
            
```
<br>

We can't just replace it with `None` because arrays must be contiguous. Instead, we might do the same process as `insert` but backwards, shifting everything over to the left.

We can store a value that shows whether or not removed is true, to change to true if the element is found so that the loop goes through to move elements forward:

<br>

```
def array_remove(array, element):
    removed = False
    for i in range(array.count):
        if removed: 
            # if removed is True, we should...?
        elif array.elements[i] == element:
            removed = True
```
<br>

If the element is found and removed becomes True, we then want the loop to set element at `i-1` to `i`, to shift the elements to the left:

<br>

```
if removed: 
            array.elements[i-1] = array.elements[i]
```
<br>

At the end, we'll check if removed is True or False, to render an error if the element was not found. We also need to decrement the count of the array and set the last index to None.

If we look at the example array again and try to remove 43:

> 22, 34, 76, 43, 82, 91, xx, xx, xx   
> 22, 34, 76, 82, 82, 91, xx, xx, xx   
> 22, 34, 76, 82, 91, 91, xx, xx, xx   

Now we'll lower the count by 1, so `array.count` = 5:

> 22, 34, 76, 82, 91, 91, xx, xx, xx    

And then set `array.count` (which is array[5], or the second `91`) to `None`:

> 22, 34, 76, 82, 91, xx, xx, xx  

<br>

With code, that will look like:

<br>

```
def array_remove(array, element):
    removed = False
    for i in range(array.count):
        if removed: 
            # if removed is True, we should...?
            array.elements[i-1] = array.elements[i]
        elif array.elements[i] == element:
            removed = True
    
    if removed:
        array.count -= 1
        array.elements[array.count] = None
    
    else: 
            print(f"Error: {str(element)} not found.")
```
<br>
<br>


## Pop Arrays

We need to remove an element at a given index and then return it; then shift every element after that index to fill in the gap.

First we'll error handle in case the index is not in range. This time, we'll set the error to be `>=` instead of `>` because we can't pop the element after the last index: 

<br>

```
def array_pop(array, index):
    # Throw an error if array is out of the current count
    if index >= array.count:
        print("Error: out of points in array_pop")
        return None
```
<br>

Now we need to set the return value and shift everything over:  

<br>

```
    # Set the return value of the number being popped so it's stored before being removed
    return_value = array.elements[index]

    # Make a for loop to shift elements over
    # Start one after the index and end at array.count (because it stops at that given position without including it)
    for i in range(index + 1, array.count):
        array.elements[i - 1] = array.elements[i]
```
<br>

Remember, that `for i in range()` is _inclusive_ of the first given element (the start) and _exclusive_ of the last given element (the end). 

Lastly, we need to update the `count` and set the last element to `None`, then return the requested `return_value`:


<br>

```
def array_pop(array, index):
    # Throw an error if array is out of the current count
    if index >= array.count:
        print("Error: out of points in array_pop")
        return None

    # Set the return value of the number being popped so it's stored before being removed
    return_value = array.elements[index]

    # Make a for loop to shift elements over
    # Start one after the index and end at array.count (because it stops at that given position without including it)
    for i in range(index + 1, array.count):
        array.elements[i - 1] = array.elements[i]

    array.count -= 1
    array.elements[array.count] = None

    return return_value
```

<br>
<br>


## Doubly Linked Lists

We'll use the `doubly_linked_list.py` file in the [Hash Tables Repo](https://github.com/LambdaSchool/Hash-Tables) -- copied into this repo for simplification.    

When would we use a doubly linked list v a dynamic array?  

We use arrays when the speed of an index lookup is needed, but linked lists when you need to resize the data and don't care about caching.  

The file (also from the Hash Tables Repo but copied here) `compare.py` has a series of tests to compare the time efficiency of different operations with linked lists and arrays.  

On your own, you can experiment with that file to make conclusions about Big O as it relates to both of those data structures in different operations.  

<br>
<br>

## Hash Tables

What are good qualities of a hash function?  

- An input must have a consistent output (always the same) and it's one-way.  
- Creating the hash should be simple but recreating it going backwards should be effectively impossible. Salting, for example, adds complexity to prevent backwards recreation.  
- It should be evenly random to avoid collisions

A hash function takes a value and runs a hashing operation onto it.

We can use a string as an index in an array (as a label to assign value to something). Like in this diagram:  

![Hash Table Example](./HashTableImage.png "Hash Table Example")

The string `John Smith` is used as the index `2` in this array, to point to the element bucket `521-1234`.  

A hash table converts the string into an index. We create an oversized array (because memory and storage are cheap, to save computing power) and set the index as a label to the corresponding integer.  

This results in an O(1) run time for finding things in the hash table.  

<br>

Imagine if we had a bunch of budget categories. In a spreadsheet, we diagram it with a series of index numbers corresponding to the budget's numerical values. Remembering which column (index) corresponds with which part of the budget would be nearly impossible if there are many categories.  

Using a hash table, we can keep a string reference to each index to make that simpler, like:  


| Category      | Index | Budget $$  |
| ------------- |:-----:| ----------:|
| Groceries     | 0     |       $500 |
| Gas Money     | 1     |       $150 |
| New Clothes   | 2     |       $100 |
| Pet Supplies  | 3     |        $25 |
| Toiletries    | 4     |        $50 |


<br>
<br>

For [today's assignment](https://github.com/LambdaSchool/Hash-Tables/tree/master/basic_hashtable), avoid re-sizing and handling collisions, which we'll cover in the next lecture.  

<br>

# Lecture I Additional Resources

[Hash Tables: Intro Video](https://youtu.be/z07XGvC9D4c)  

[Hash Tables: Collisions and Resizing Video](https://youtu.be/u38jSupgQvU)  

[What are Hashtables and Hashing Algorithms?](http://www.goodmath.org/blog/2013/10/20/basic-data-structures-hash-tables/)  

[3 Common Hash Functions](http://www.cse.yorku.ca/~oz/hash.html)  

[Breaking Down an Efficient Hash Function](http://www.azillionmonkeys.com/qed/hash.html)  



<br>
<br>
<br>
<br>

# Lecture II

[Lecture II Recording](https://www.youtube.com/watch?v=b60t_qHXoqA&feature=youtu.be)  
<br>

## Basic Hashtable

Today we'll use the `basic_hashtables.py` file in the [Hash Tables Repo](https://github.com/LambdaSchool/Hash-Tables) -- copied into this repo for simplification. 

Going over the solution, first we need to look at the class Pair function:  

```
class Pair:
    def __init__(self, key, value):
        self.key = key
        self.value = value
```

This looks complete, so the next thing we might fill out is our Hash table creation function.

<br>


First, we should take a look at the other code in this file and understand what the assignment's directions are asking us to do. Sometimes it's helpful to run the code too, to see what happens -- both the hashtables file and the test file.  

The first error we'll find is that the test fails in `b_hashtables.py` is that the test passes automatically (it returns `...gone tomorrow (success!)` when it shouldn't yet).  

<br>

We could start with the first two functions, but it might be a better strategy to research the hash function. One reason might be that it's a standalone item, but we also need to use the hash function as we create our hash table. This project seems to be dependent upon that function.  

<br>
<br>

## dbj2

This hash function has several online articles devoted to it. There are a few methods of implementing it. [This article](http://www.goodmath.org/blog/2013/10/20/basic-data-structures-hash-tables/) has a Python solution that we can use.  

If we implement it like so...  

```
def djb2(key):
    hash = 5381
    for i in key:
        print(f'Hash: {hash}, Hash * 33: {hash * 33}, ord(i): {ord(i)}. SUM: {(hash*33)+ord(i)}')
        hash = (hash * 33) + ord(i)
    return hash

print(djb2('hip'))
```
<br>

 To understand what's happening inside this hash function, we notice that on each loop, it adds `hash * 33` to the Unicode point of that letter in the string (for example, `b` is 66 in the ASCII character table), and updates hash to that sum.
 
 <br>

 Printed into the terminal for 'hip', we get the following:  

 ```
Hash: 5381, Hash * 33: 177573, ord(i): 104. SUM: 177677
Hash: 177677, Hash * 33: 5863341, ord(i): 105. SUM: 5863446
Hash: 5863446, Hash * 33: 193493718, ord(i): 112. SUM: 193493830
 ```

<br>

The return of this hash function is `193493830`, the final sum of each letter being hashed and added to the previous.


[Another solution](https://gist.github.com/mengzhuo/180cd6be8ba9e2743753) online is this version:

```
def hash_djb2(s):
    hash = 5381
    for x in s:
    hash = (( hash << 5) + hash) + ord(x)
    return hash & 0xFFFFFFFF
```

<br>

What does `<<` mean in Python?  

[Python wiki](https://wiki.python.org/moin/BitwiseOperators) says:

> x << y  
> Returns x with the bits shifted to the left by y places (and new bits on the right-hand-side are zeros).   
> This is the same as multiplying x by 2**y.  

<br>

_Good research question -- why do we use 5381 as the starting hash point?_  

<br>
<br>

Looking at our starter code, there is a significant difference from the online solutions:

```
def hash(string, max):
    pass
```
<br>

We have a `max` parameter. What is that for? For now, we'll fill in what we know.

```
def hash(string, max):
    hash = 5381
    for i in string:
        hash = (( hash << 5) + hash) + ord(i)
    return hash & 0xFFFFFFFF
```
<br>

What does the single `&` in Python do? 

> x & y  
> Does a "bitwise and".  
> Each bit of the output is 1 if the corresponding bit of x AND of y is 1, otherwise it's 0.  

<br>

This explanation isn't very clear. How can we figure out what it _means_, particularly in our code?  

Let's add some tests into the TESTING function:

```
print(hash('hello world', 0))
print(hash('goodbye', 0))
print(hash('AAA', 0))
```
<br>

This outputs into the terminal:

```
894552257
124507022
193449992
```
<br>

But this still doesn't really tell us what is happening. If we remove ` & 0xFFFFFFFF` from the hash function, the output then becomes:

```
272131203564429232321
229467342230414
193449992
```
<br>

All we can tell from that is it stops returning a set length of number and varies somewhat according to the length of the inputted string.  

With unlimited time, this would be a great research question -- but all we need to do with this hash function is create an index within an array for our hash table. For now, this limited understanding is sufficient.  

<br>

`Max` probably needs to be the hash table's capacity -- that is the max size it should be, with our outputted index not being larger than that. So how can we ensure that the output is within bounds?

```
def hash(string, max):
    hash = 5381
    for i in string:
        hash = (( hash << 5) + hash) + ord(i)
    return hash % max
```
<br>

By using the `modulo`, we can make sure that the point being chosen is a random spot within the capacity of the hash table.

Now if we print our test strings again:

```
print(hash('hello world', 601))
print(hash('goodbye', 10000))
print(hash('AAA', 355))
```
<br>

The output becomes:

```
65
768
0
```

<br>
<br>

## Collisions

How many people do you need in a room, to absolutely guarantee that two of them will have the same birthday?

`366` or one more than the total number of possible days in the year. In the same way, finding two people in NYC with the same number of hairs on their head would only require there being more people in NYC than the average number of hairs on a head.

This is an example of collision.

<br>

We need to account for this in our functions by throwing an error if it occurs.  

If two inputs have the same index output, this would be a collision in our hashing functions, resulting in two inputs with the same index, overwriting the first. Obviously, this could be problematic.  

<br>
<br>

## Hash Table

Let's build our hash table next:

```
class BasicHashTable:
    def __init__(self, capacity):
        pass

```
<br>

At its core, a hash table is an array (eventually, an array of linked lists).

Let's use our array definition from yesterday:

```
class BasicHashTable:
    def __init__(self, capacity):
        self.capacity = capacity
        # self.count = 0
        self.storage = [None] * capacity
```
<br>

We'll comment out self.count because it's not apparent if we'll need it, but it could prove useful later.

Next, let's insert things into our hash table, by hashing the key to create an index:

```
def hash_table_insert(hash_table, key, value):
    pass
```
<br>

Remember, our max is the capacity of our hash table:

```
def hash_table_insert(hash_table, key, value):
    index = hash(key, hash_table.capacity)
```
<br>

We should check to see if there is already an element in the hash table at that index:

```
def hash_table_insert(hash_table, key, value):
    index = hash(key, hash_table.capacity)
    if hash_table.storage[index] is not None:
        print(f"Warning: Index at {str(index)} is currently ({hash_table.storage[index]}). It will now be overwritten.")
```
<br>

What are we storing at that index? 

We need to store the Pair Class, not just the value. It would be a bad idea to solely store the value because if there is a collision, there might be multiple values stored there. We need to be able to compare the keys so we can grab the _correct_ value.

Later on, we'll solve our collision problem like that. For now, we just want to know for certain that we are having a collision by noting if the keys are the same or not.

```
def hash_table_insert(hash_table, key, value):
    index = hash(key, hash_table.capacity)
    pair = Pair(key, value)
    stored_pair = hash_table.storage[index]
```
<br>

This adds a way for us to compare the pair we're trying to add to the currently existing pair key value in storage.

```
def hash_table_insert(hash_table, key, value):
    index = hash(key, hash_table.capacity)
    pair = Pair(key, value)
    stored_pair = hash_table.storage[index]

    if hash_table.storage[index] is not None:
        if pair.key != stored_pair.key:
            print(f"Warning: Index at {str(index)} is currently ({hash_table.storage[index]}). It will now be overwritten.")

    # Now lets overwrite it
    hash_table.storage[index] = pair
```
<br>

This looks good, but we can't test it yet because we haven't written our retrieve function...

In the meantime, we could use our Python debugger with `breakpoint()`:

```
def Testing():
    print(hash('hello world', 601))
    print(hash('goodbye', 10000))
    print(hash('AAA', 355))
    
    ht = BasicHashTable(16)

    hash_table_insert(ht, "line", "Here today...\n")
    breakpoint()
```
<br>

Which will turn out in the terminal like so:  

```
(Pdb) ht
<__main__.BasicHashTable object at 0x10c3361d0>
```
<br>

Pdb is the Python debugger. By writing `ht`, we're calling our hash table named in the test.

This shows us the directory of our hash table.

```
(Pdb) dir(ht)
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'capacity', 'count', 'storage']
```
<br>

We can look at our storage directly like so:

```
(Pdb) ht.storage
[<__main__.Pair object at 0x10c336208>, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None]
```
<br>

Since we see there is something stored at the first spot in storage, we can check what the value of that is:

```
(Pdb) ht.storage[0].value
'Here today...\n'
```
<br>

Our debugger shows that we did successfully add: `Here today...\n`.  

<br>
<br>

## Retrieval

We could opt to build remove first, but if we build retrieve first, that allows us to use retrieve to test if our remove functions works.

```
def hash_table_retrieve(hash_table, key):
    pass
```
<br>

First, we can return none if the key is not found, which is the default case of our function:

```
def hash_table_retrieve(hash_table, key):
    
    return None
```
<br>

Next we should hash the key to get the index of the key, to search for it:

```
def hash_table_retrieve(hash_table, key):
    index = hash(key, hash_table.capacity)

    return None
```
<br>

Now we'll check to see if the key exists at that index, and if it does, if it matches the passed in key. If so, we'll return that value:

```
def hash_table_retrieve(hash_table, key):
    index = hash(key, hash_table.capacity)

    if hash_table.storage[index] is not None:
        if hash_table.storage[index].key == key:
            return hash_table.storage[index].value

    return None
```
<br>

Lastly, we can add some error handling to let the user know what might have gone wrong if the expected result does not return:

```
def hash_table_retrieve(hash_table, key):
    index = hash(key, hash_table.capacity)

    if hash_table.storage[index] is not None:
        if hash_table.storage[index].key == key:
            return hash_table.storage[index].value
        print(f'Key {key} at that index does not match.')

    print(f'Unable to find value with key: {key}')
    return None
```
<br>

Now when we run the tests, we get the expected error: `ERROR: STILL HERE` which shows our retrieval is working well.

<br><br>

## Remove

Let's build our removal function:

```
def hash_table_remove(hash_table, key):
    pass
```
<br>

First we want to see if the value is there and matches the key, then set the index and value to None to remove it:

```
def hash_table_remove(hash_table, key):
    index = hash(key, hash_table.capacity)

    if hash_table.storage[index] is None or hash_table.storage[index].key != key:
        print(f'Unable to remove item with key: {key}')
```
<br>

Our linter doesn't like that long line. In Python, we can have a multi-line `if` statement like so:

```
    if (hash_table.storage[index] is None or
            hash_table.storage[index].key != key):
        print(f'Unable to remove item with key: {key}')
```
<br>

Remember to do this:

- There should be NO trailing space after the `or`
- The second line must be doubly indented to not match the if statement inside
- We wrap the entire if statement in parenthesis

<br>

Lastly, we just set the index to None if it does exists and the keys match:

```
def hash_table_remove(hash_table, key):
    index = hash(key, hash_table.capacity)

    if (hash_table.storage[index] is None or
            hash_table.storage[index].key != key):
        print(f'Unable to remove item with key: {key}')
    else:
        hash_table.storage[index] = None
```
<br>

Now our test returns `...gone tomorrow (success!)` which means the remove function works as expected.

<br>
<br>

## Alternate Solutions

Instead of storing a capacity value, we could use `len(hash_table.storage)` when creating the index:

```
index = hash(key, len(hash_table.storage))
```
<br>

Depending on how often we're running this, it could be more time efficient, since we can derive this information, so it's unnecessary to store it.

We could also invert the logic of the retrieval function to catch when the index is None rather than when it has an appropriate value:

```
if (hash_table.storage[index] is None or
        hash_table.storage[index].key != key):
    print(f"Unable to retrieve entry with key: {key}")
    return None

else return hash_table.storage[index].value
```

<br>
<br>


## Dealing with Collisions

How can we help prevent collisions?

By allocating excessive amounts of memory, that reduces the liklihood of returning the same index twice; but in order to fully prevent that from happening we need to create a linked list. This means the array can hold as many as needed.

What are the downsides of having this linked list solution?

It takes longer to search because we have to use a loop which results in O(n) linear run time (worst case). It's not _bad_ but we always prefer better than worse.

<br>
<br>
