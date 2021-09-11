This repo includes the final notes as they ended up over the course of both lectures. You can create your own files to follow along and test writing the code, or simply view the final iteration. Code snippets are included along the way to see the progression to the final code base.

[Python Cheat Sheets](https://ehmatthes.github.io/pcc/cheatsheets/README.html)

<br>

# NOTES Lecture I

We have a store called ET World that has:

1. Apparel
2. Shoes
3. Accessories
4. Exit

There are three categories of things that are being sold or are in the store. The last item (exit) is an action that can be taken by someone in the store. There are two categories here.

We want to be able to type in a number corresponding to an area of the store, and see a list of products in that area.

Let's make our store class, using the keyword "class" followed by the name (usually capitalized):

```class Store:```


We'll need to define a specific function to create the attributes of this class:

```
class Store:
    def _init_(self):
        # attributes here
```

We always need to use _init_ because it is a constructor for creating classes, that needs to be passed at least one specific parameter: self. There can be following parameters too, but it must always have at least self.

```
class Store:
    def _init_(self, name, categories):
        self.name = name
        self.categories = categories
```

To give the class initial values, we set self.THING to something, like self.name = name. 

When we call init in our program, we're trying to take specific values and assign them to specific Store instances. Like, on this specific store, set the name equal to "Sports Store" or "Cooking". 

Self is like the "this" keyword in JavaScript - it's a reference to THIS specific object in memory that we're trying to initialize or change. It indicates which object. We are setting the "name" value on THIS object, the Sports Store.

It binds attributes to a specific instance.

Let's test this out by creating a store:

```
my_store = Store("The Dugout", ["Running", "Baseball", "Basketball"])
print(my_store)
```

This should print out a new instance of the Store class, but instead we get:

```
<_main_.Store object at 0x1048560b8>
```

What is the random number? It references the location in memory where our Store object is, written in hexidecimal. However, that's not particularly useful to us. We could override the default behaviour of the string method though. If we don't define it, the default behaviour is to print out the memory location.

```
class Store:
    def __init__(self, name, categories):
        self.name = name
        self.categories = categories

    def __repr__(self):
      # Name
      # 1. + categories[0]
      # 2. + categories[1]
```

We can get a string representation of an object in a few ways ( str(), repr() ). Generally, str() is used to output to an end user while repr() is used for debugging and development (output to the dev).  (More info: https://www.pythoncentral.io/what-is-the-difference-between-__str__-and-__repr__-in-python/) 

```
class Store:
    def __init__(self, name, categories):
        self.name = name
        self.categories = categories

    def __repr__(self):
      output = ""
      output += self.name + '\n'
      i = 1
      for c in self.categories:
          output += str(i) + '. ' + c + '\n'
          i += 1
      return output
```

** NOTE: The underscores before and after init, repr and str must be double underscores, not single.


Now the output in the terminal when we print:

```
my_store = Store("The Dugout", ["Running", "Baseball", "Basketball"])
print(my_store)
```

Is:

The Dugout
1. Running
2. Baseball
3. Basketball


Now let's get our user to select a department so they can then see what inventory is there using some if/else logic:

```
selection = input("Select the number of a department")
if int(selection) > 0 and int(selection) <= len(my_store.categories):
    print("The user selected " + str(selection))
else:
    print("Please select a valid number")
```

Now our user can type in any valid number that exists, even if we add categories, and will return an error message if the user inputs something outside of the expected range.

But if we input a letter or any other non-integer, this will break. We need to still handle this type of error.

We can "catch" the specific error happening and run an alternate block of code. The error we're getting is:

```
ValueError: invalid literal for int() with base 10: 'g'
```

So let's add a try/catch block using the try/except syntax:

```
try:
    if int(selection) > 0 and int(selection) <= len(my_store.categories):
        print("The user selected " + str(selection))
    else:
        print("Please select a valid number")
except ValueError:
    print('Please enter your choice as a number.')
```

Now if the user enters a letter instead, a more accurate error message is sent to them. Ideally, we'd also allow them to enter a new input and try again.

That handles a specific ValueError (and there are other specific error messages that we can handle) but we could also create a more general error handling too.

(See more errors in the Python 3 docs: https://docs.python.org/3/library/exceptions.html)

To allow the user to continue to input choices, we would wrap our logic in a while loop. We could do this by tacking on a fourth option that is a hard coded exit:

```
def __repr__(self):
        output = ''
        output += self.name + '\n'
        i = 1
        for c in self.categories:
            output += str(i) + '. ' + c + '\n'
            i += 1
        output += str(i) + '. Exit'
        return output
```

And then we would need to tweak the accepted range and wrap the entire segment in a while loop:

```
selection = 0
while int(selection) != len(my_store.categories)+1:
    selection = input("Select the number of a department ")
    try:
        if int(selection) > 0 and int(selection) <= len(my_store.categories)+1:
            print("The user selected " + str(selection))
        else:
            print("Please select a valid number")
    except ValueError:
        print('Please enter your choice as a number.')
```

However, then it no longer handles a non-integer issue. The better way to handle this is to cast our selection as an integer within our try catch:

```
selection = 0
while selection != len(my_store.categories)+1:
    selection = input("Select the number of a department ")
    try:
        selection = int(selection)
        if selection > 0 and selection <= len(my_store.categories)+1:
            print("The user selected " + selection)
        else:
            print("Please select a valid number")
    except ValueError:
        print('Please enter your choice as a number.')

print('Goodbye!')
```

This allows us to remove our extra str() and int() because selection is cast as we want it to be used throughout.

All of this is kept inside of a store.py file. Let's now create a category.py file to setup a category class:

```
class Category:

    def __init__(self, name):
    # add later: product list parameter
        self.name = name

    def __repr__(self):
        return "No products in " + self.name 
```

Instead of hard coding strings into our store, we could use the category class to create an instance of each category in our store.py file:

```
my_store = Store("The Dugout", [Category("Running"), Category("Baseball"), Category("Basketball")])
print(my_store)
```

But we need to import the category class in order to use it within our file:

```
from category import Category
```

The syntax when we create a class is to "from FILENAME import CLASSNAME"

Now we're running into an error:

```
TypeError: can only concatenate str (not "Category") to str
```

Because before, the Categories were just string literals, it was fine to concat them into a string, but now we need to pull the name out of that instance of category to use when printing, like so:

```
        for c in self.categories:
            output += str(i) + '. ' + c.name + '\n'
            i += 1
```

We have to make sure to call the name of the instance to pull that string, because we only want the name, not the entire instance.

Now how could we print the cateory instead of "the user selected..." when they make a department choice?

```
            print(f"You chose {my_store.categories[selection-1].name}.")
```

This now triggers an error when we try to exit though because so we need to slightly adjust our if/else loop:

```
    try:
        selection = int(selection)
        if selection > 0 and selection < len(my_store.categories)+1:
            print(f"You chose {my_store.categories[selection-1].name}.")
        elif(selection > len(my_store.categories)+1):
            print("Please select a valid number")
```

Or by nesting the if statements:

```
if selection > 0 and selection <= len(my_store.categories)+1:
            if selection == len(my_store.categories)+1:
                exit()
                
            print(f"You chose {my_store.categories[selection-1].name}.")
```


# Notes Lecture II

##### Inheritance and Association

```Perhaps the most important concept in OOP, a class may inherit from another class. This gives the child class all of the variables and methods found in the parent class, or classes, automatically. Child classes can also override parent methods to define alternate or additional behaviors. Inheritance is also sometimes described as an “is-a” relationship.```

Often clarified by describing one as "is a" versus "has a"

"Has a" indicates an `association relationship`. For example, the relationship between Week and Day is associative, because a Week has a Day.

"Is a" indicates an `inheritance relationship`. For example, the relationship between a Comic Book and a Book is inherited, because a Comic Book is a type of Book.

When one class inherits from another class, that is an "is a" (inherited) relationship. We can test it by asking ourselves if this sentence makes sense for two classes:

```ClassA is a Class B```

If that makes sense and is true, that is an "is a" relationship.

If one class wouldn't make sense using the "is a" test, it's probably associative instead of inherited.

```Category is a Store```

Category is not a Store (per our current code example), so that is NOT an "is a" (inherited) relationship.

```A Store has a Category.```

This statement is true, so the relationship between these two classes is a "has a" (associative) relationship.

More strongly typed classes would indicate the Type in the class, so that it's more obvious. In Python it's not always clear but does occur.

Currently, our Store has association, but not inheritance.

For further reading: https://interactivepython.org/runestone/static/JavaReview/OOBasics/ooAssocVsInherit.html



##### Composition and Aggregation

Within an association relationship, there are two further specializations: `composition` and `aggregation`.

A *composition* relationship exists when one class has instance variables (attributes) that are using a second class. One class is a container while the other is the content. If you delete the container class, all of its content class instances are also deleted.

An example of this would be a class of Salary and a class of Employee, which uses salary as an attribute on its class instance.

If the Employee and Salary were created like so:

```class Employee:
        def __init__(self, pay):
            self.pay=pay
            self.obj_salary=Salary(self.pay)
```

This instance of Salary would cease to exist if we deleted the container class instance of this Employee. The Salary is created by this instance of Employee and does not exist separately from it.

*Aggregation* is a form of composition where the content object can exist without the container object.

If we adjust the Employee and Salary instances like so:

```class Salary:
        def __init__(self, pay):
            self.pay = pay

        def get_total_(self):
            return (self.pay*12)
    
    class Employee:
        def __init__(self, pay):
            self.pay = pay
        
        def annual_salary(self):
            return "Total: " + str(self.pay.get_total())

obj_sal = Salary(100)
obj_emp = Employee(obj_sal, 10)
print (obj_emp.annual_salary())
```

Salary exists independently of any single instance of Employee, so it has an aggregate relationship to Employee.


In our code example, the attributes in our Store class for categories are defined in a separate class (Category). We could delete the Store class and the categories would still exist, as they are currently defined. This is an _aggregation_ example.

If, however, the Category instances were created _in_ the Store instance, that would be a _composition_ example. By deleting the Store, the Categories would also cease to exist.

Further reading: https://stackoverflow.com/questions/19861785/composition-and-aggregation-in-python


#### In summary:

*Inheritance*: a class may inherit from another class. This gives the child class all of the variables and methods found in the parent class, or classes, automatically. "Is a" relationship.

*Association*: objects or constructs that exist in the real-world and are related to each other that do not have hierarchical, inheritance relationships. "Has a" relationship.


#### Let's apply inheritance to our Store class

Add a new file called `product.py` to our `src` folder. We'll assume we have a broad variety of products in general categories, plus more specific variants - this is a good example for inheritance.

Some good attributes for general Products would exist for every product, like name and price:

```
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
```

Different products that could exist could be clothing, food, shoes, etc.. And each of those could be broken down into more specific levels within those categories.

In a hierarchy, the class at the top would be called a `Superclass` or `Parent Class` (like Product class). A `sub-class` or `child class` is a lower hierarchy class (like clothing, shoes).

The child class is always going to be bigger than the parent class - not in terms of lines of code, but because it _inherits_ everything from the parent class, plus has its own unique attributes. The Clothing Class will not just include the code for the Clothing Class, but also all of the functiosn and attributes defined in the Product Class. And so on for all of the child classes below it.

While each product would have a specific department, we'll actually use that to help catgorize products under the Category class, like so:

```class Category:

    def __init__(self, name, products):
    # add later: product list parameter
        self.name = name
        self.products = products
```


There is nothing we do in Python specifically to indicate something is a Parent class, but there is syntax required for indicating something is a child class.


Let's also add the string version of our Product for our end user (not developer) to see:

```    
def __str__(self):
    return self.name + '\t$' + str(self.price)
```

Now, to test that our Product class is working as intended:

```
p = Product('baseball bat', 19.99)
print(p)
```

In the terminal, it prints:

`baseball bat	$19.99`

Let's take that and add to our store.py file:

```from product import Product```

Under the Baseball category, we'll add a list of Products:

```
my_store = Store("The Dugout",   [Category("Running"), Category("Baseball", [Product('baseball bat', 299.99), Product('baseball", 11.99')]), Category("Basketball")])
```

Now, we need to update our Category class to handle new products:

```
class Category:

    def __init__(self, name, *products):
        # add later: product list parameter
        self.name = name
        self.products = products

    def __repr__(self):
        output = self.name
        if(self.products):
            for p in self.products:
                output += '\n' + str(p)
            return output
        else:
            return "No products in " + self.name
```

We've made products an optional parameter, in case a Category does not have any products, and handled the output using an if/else statement.

When also need to adjust the print line on line 28 in store.py:

```            print(f"You chose {my_store.categories[selection-1]}.")
```

In `store.py`, our print statement points to the `__str__` method on `catgory.py` for what to print (the return). 

```            for p in self.products:
                output += '\n' + str(p)
```

Points back to Product.py which will look at its string output for what to print:

```
    def __repr__(self):
        return self.name + '\t$' + str(self.price)
```

Which is how we end up with the user's selection being printed as:

```
You chose Baseball
[baseball bat	$299.99, baseball	$11.99].
```

Let's add some child classes with the files `equipment.py` and `clothing.py`

To indicate that these classes are child classes and have a parent class, we'll use this syntax. We'll define the class Name(Parent Class Name) with the parent class in the parenthesis following, like so:

```
class Clothing(Product):
    def __init__(self):
        
```

Referencing our Product parent class, we can see that any child class is setup to have the attributes of name and price. What are additional attributes that clothing might have, that products in general don't necessarily? Likely color and size.

So our clothing child class is setup like this:

```
class Clothing(Product):
    def __init__(self, name, price, color, size):
        #...
        self.color = color
        self.size = size
        
```

But how do we initialize the inherited attributes from the parent (name and price) without tediously typing out the same self.price = price?

This is where the `super` keyword comes into play. Using `super()` we can give the child class the inherited attributes and setup of a parent class.

Super allows us to pull from the parent class - reference this attribute/function from the parent class.

In the parent Product class, we've already initialized what to do with name in price, so we'll use super to call init() from the parent, and pass the attributes that we want the parent to handle, like so:

```
class Clothing(Product):
    def __init__(self, name, price, color, size):
        super().__init__(name, price)
        self.color = color
        self.size = size
```

It doesn't know how to handle color or size, so we do not pass those to the super() function, but it can handle name and price. We'll handle the parent super() initializations first, then initialize the unique, standalone attributes within this child class init().


Let's setup our equipment child class too:

```
class Equipment(Product):
    def __init__(self, name, price, style, weight):
        super().__init__(name, price)
        self.style = style
        self.weight = weight
```

Style will be used to indicate if this item is unisex, men's, women's, or children's sizing.

We also need to import Product from our product.py file:

```
from product import Product
```

Let's test this by printing within our Store, like so, to use Clothing and Equipment:

```
my_store = Store("The Dugout",   [Category("Running", [Clothing('Shorts', 19.99, 'red', 12), Clothing('Socks', 8.99, 'white', 10)]), Category("Baseball", [Equipment('baseball bat', 299.99, 'unisex', 2.5), Equipment('baseball', 11.99, 'kids', 0.5)]), Category("Basketball")])
```

Now our Running department has Socks and Shorts, and our Baseball department has a baseball and baseball bat.

Our terminal is currently printing the name and price of these child classes, but not the sub-attributes (size or color) because our clothing and equipment child classes do not have a defined string method.

It's still being cast to a string because it has inherited the parent class str() method that defines what the string value is (instead of the memory location), but it is not set to handle the sub-attributes.

Now, when we have a child class, if there is no indicated str() or repr() method on that class, it will use the str() or repr() method on the parent class. So, until we define one on the clothing class, it will continue to use the one on the category class.

But if we add to the clothing child class:

```
    def __repr__(self):
        return str(self.name) + '\t$' + str(self.price) + " comes in " + str(self.color) + ', ' + str(self.size)

```

The terminal will now print a string representation of the clothing products like so:

```
Shorts	$19.99 comes in red, 12
Socks	$8.99 comes in white, 10.
```

But we are not creating DRY code because we're re-typing the same first part of that repr() return. How could we use super to eliminate the duplicate code?

```
    def __repr__(self):
        return super().__repr__() + " comes in " + str(self.color) + ', ' + str(self.size)
```

Similarly to before, we can make use of super() to call a method on the parent class to fill in the first part of that string return.

