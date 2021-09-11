# Lecture 3: Design Patterns

[**Video**](https://github.com/jhu-oose/2019-students/releases/download/lectures-videos/oose--lectures--3.mp4){:data-proofer-ignore="true"} <small title="You must be a registered student logged into GitHub to see this.">🔒</small>

# Introduction

- People tried to follow the [principles](/lectures/2) and ended up recreating the same design over and over, which became design patterns.
- Some design patterns are simple ideas that you could find on your own (but it’s nice to have a name for them). Some design patterns are sophisticated ideas that would take time to find on your own.
- Some design patterns have to do with how objects are instantiated (creational). Some design patterns have to do with how objects are put together (structural). Some design patterns have to do with objects fulfill certain responsibilities (behavioral).
- Like with [design principles](/lectures/2), sometimes you want to use a design pattern, and sometimes you don’t, which is okay as long as you know _why_ you’re doing it.
- Design patterns aren’t always applied exactly like you find them in textbooks.

# References

- The canonical book on design patterns is _Design Patterns: Elements of Reusable Object-Oriented Software_, by _The Gang of Four_: Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides:
  <figure markdown="1">
  ![Design Patterns: Elements of Reusable Object-Oriented Software](design-patterns.jpg){:width="250"}
  </figure>
- Some people also like _Head First Design Patterns: A Brain-Friendly Guide_, by Eric Freeman, Bert Bates, Kathy Sierra, and Elisabeth Robson:
  <figure markdown="1">
  ![Head First Design Patterns: A Brain-Friendly Guide](head-first.jpg){:width="250"}
  </figure>
- Yet other people prefer to Google around; they’re likely to find [Refactoring.Guru](https://refactoring.guru) useful.
- Googling around you may also find SourceMaking, which is another website that looks similar to Refactoring.Guru and covers similar material. **Avoid SourceMaking and prefer Refactoring.Guru instead.** SourceMaking doesn’t seem to present the material as well as Refactoring.Guru, and it appears to be [plagiarism](https://twitter.com/martinfowler/status/682415411384725504), as opposed to Refactoring.Guru, which appears to be [legit](https://twitter.com/martinfowler/status/1073351378700066817). (The person behind these tweets, Martin Fowler, is the author on the canonical book on refactoring, which is covered in these websites and will be the subject of [Lecture 8](/lectures/8).)

# Find the Design Pattern

Find the design pattern in one of the applications we’ve worked with thus far: either [TODOOSE](https://github.com/jhu-oose/todoose) or something from the assignments (for example, [Minesweeper](/assignments/1)). The pattern may be used by the application, or it could have been used by the application, or it was used by one of the libraries on which the application depends, or it could have been used by one of these libraries, or you may propose an extended feature for the application and use the pattern on the design of that extension, and so forth.

# Model–View–Controller (MVC)

<small>
This doesn’t appear in the original Design Patterns book.
</small>

There are a million different interpretations to MVC: from the original Xerox paper, from Ruby on Rails and other web frameworks, from JavaScript frameworks, and so forth. But in general:

**Model:** The source of truth for data; and the business logic, for example, the rules of a game.

**View:** The representation of the data as seen by the client. The client may be the user, or if we’re talking about the server, the client is the browser, and the view is the mapping to JSON.

**Controller:** Handles the interactions from the client, and coordinates the work of the other parts of the system, including the Model and the View. Again, the client may be the user, or if we’re talking about the server, the client is the browser which initiated the HTTP request.

**Where are the M, the V, and the C in TODOOSE’s server? (Hint: We’ve covered this in lectures and assignments.)**

<details markdown="1">
<summary>My Answer</summary>

The models are in `com.jhuoose.todoose.models`, the controllers are in `com.jhuoose.todoose.controllers.ItemsController`, and the view are the JSON mapping in the controller (though that’s a stretch).

</details>

TODOOSE is a distributed application composed of two components communicating over the network, the server and the client, and each component is an application of its own, which could have its own MVC stack.

**The TODOOSE client (where is it?) doesn’t use the MVC pattern directly. If it were to use it, which parts of the code would end up in the M, the V, and the C? Why would you want to move to this architecture in the client?**

<details markdown="1">
<summary>My Answer</summary>

**Models:** Things like `{ items: await (await fetch("/items")).json() }`.

**Views:** The renderable parts of the React components (React only helps with the **V** in MVC).

**Controllers:** The methods called `handle<Event>()` (which handle user interaction, like clicks of a button), and methods like `componentDidMount()`.

You’d want to move to a MVC architecture on the client when there’s more logic on the client, besides just display data coming from the server and issuing simple HTTP requests. Or maybe if you have a design team who’s only writing the **V**, and a software development team who’s writing the rest.

</details>

**What [principles](/lectures/2) are you following or breaking when you use this design pattern?**

<details markdown="1">
<summary>My Answer</summary>

Following Single Responsibility, but breaking YAGNI (unless you aren’t).

</details>

# Singleton

In Java, the only way to create an object is by creating a new instance of a class. But in JavaScript we may create objects directly, for example:

```javascript
const configuration = {
  name: "TODOOSE",
  url: "https://todoose.herokuapp.com"
};
```

This is useful when the object must be unique throughout the system, for example, some configuration, or an object representing some piece of hardware (like a printer in a system in which there’s only one printer), and so forth.

To reproduce this effect in Java, we may have a class that is instantiated only once, a _Singleton_.

**What classes are singletons in TODOOSE? (Hint: You’ll only see `new TheClassThatIsASingleton()` once in the code base.)**

<details markdown="1">
<summary>My Answer</summary>

`connection`, `itemsRepository`, and `itemsController`.

</details>

**How can we enforce that a singleton class is instantiated only once? (That is, how can we prevent other developers from inattentively creating a second instance of that class?)**

<details markdown="1">
<summary>My Answer</summary>

Make the constructor private and provide a static method which returns the only instance, for example:

```java
public class ItemsRepository {
    private static ItemsRepository instance = new ItemsRepository();

    private ItemsRepository() {
        // ...
    }

    public static ItemsRepository getInstance() {
        return instance;
    }

    // ...
}
```

What about the `connection`, on which `ItemsRepository` depend? Make it available through a static method on the `Server`:

```java
public class Server {
    private static Connection connection;

    static {
        try {
            connection = DriverManager.getConnection("jdbc:sqlite:todoose.db");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // ...

    public static Connection getConnection() {
        return connection;
    }
}
```

and when `connection` is necessary:

```java
var connection = Server.getConnection();
```

But static things, and therefore singletons, are just another name for global variables. Beware.

Also, what if you buy another printer?

</details>

**What [principles](/lectures/2) are you following or breaking when you use this design pattern?**

<details markdown="1">
<summary>My Answer</summary>

If you enforce that the class is a singleton with the technique above, you’re applying loose coupling, because the clients need to know less about the class: the system is enforcing the singleton nature of the class for you. At the same time, you may be tightening the coupling between the objects in the system and their real-world counterparts: what if you buy a new printer?

</details>

# Fluent Interface

<small>
We didn’t cover this in lecture.  
This doesn’t appear in the original Design Patterns book.
</small>

Consider the same configuration object we wrote in JavaScript when discussion [Singleton](#singleton):

```javascript
const configuration = {
  name: "TODOOSE",
  url: "https://todoose.herokuapp.com"
};
```

If the configuration fields aren’t known beforehand, it doesn’t make sense to have it as a Singleton class, because we don’t know which attributes this class should have. Instead, the configuration may be a map. In newer version of Java you may create a map like this:

```java
var configuration = Map.of(
  "name", "TODOOSE",
  "url", "https://todoose.herokuapp.com"
);
```

but in older versions the `Map.of()` method didn’t exist, so you’d have to write the object like this:

```java
var configuration = new HashMap<String, String>();
configuration.put("name", "TODOOSE");
configuration.put("url", "https://todoose.herokuapp.com");
```

It’s annoying to have to repeat `configuration` in every line. It’s also annoying that `put()` returns the values previously associated with the keys, which in our example is `null` in both cases, because we can’t do anything with these `null`s. What if `put()` instead returned something more useful, namely, the modified map itself? Then we could chain the calls to `put()`, like this:

```java
var configuration = new HashMap<String, String>()
  .put("name", "TODOOSE")
  .put("url", "https://todoose.herokuapp.com");
```

This is called a Fluent Interface. In some ways it isn’t as nice as the `Map.of()` version, because there’s more typing involved, but in some ways it’s actually nicer: for one thing, it supports arbitrarily many fields, as opposed to the `Map.of()` version which only works up to 10 fields. Also, in this version it’s easy to see at a glance what are the keys and what are the values—something you have to indicate with indentation in the original version, and indentation which may not survive an automated code formatter.

A Fluent Interface really shines when there are multiple methods in an interface that all return the underlying object. In the `Map` example, suppose that `put()`, `clear()`, `remove()`, and so forth, all returned the corresponding modified maps. Then we could write code like the following to manipulate the configuration:

```java
configuration.remove("name")
             .put("port", "7000")
             .remove("some-other-field")
             // ...
```

**Where can you find Fluent Interfaces on the TODOOSE code base? (Hint: There’s a more obvious Fluent Interface on the server, and a more interesting example somewhere else that is neither the server nor the client(!))**

<details markdown="1">
<summary>My Answer</summary>

- Javalin’s application, on `Server`.
- Postman’s tests: `pm.response.to.have.status(200)`.

</details>

**How do you implement a Fluent Interface? Create a `FluentMap` class which acts like a `Map`, but provides the `put()` method as described above.**

<details markdown="1">
<summary>My Answer</summary>

Let the fluent methods return `this`, for example:

```java
public class FluentMap<K, V> {
  private Map<K, V> map = new HashMap<K, V>();

  public FluentMap<K, V> put(K k, V v) {
    map.put(k, v);
    return this;
  }
}
```

You can use the `FluentMap` like this:

```java
var configuration = new FluentMap<String, String>()
  .put("name", "TODOOSE")
  .put("url", "https://todoose.herokuapp.com");
```

</details>


**What [principles](/lectures/2) are you following or breaking when you use this design pattern?**

<details markdown="1">
<summary>My Answer</summary>

You’re probably breaking the Interface Segregation principle, but you’re keeping things simpler, at least for the client of the interface (that is, the code using that interface).

</details>

# Decorator

<small>
We didn’t cover this in lecture.
</small>

When you want to extend (or in general, modify) a class, one possibility is to define a child class. But what if you want to extend (or in general, modify) the functionally of a few objects of a class, and not all of them?

Create a wrapper object that provides the extra functionality (or in general, different behavior), and delegates to the original object when necessary.

**Where can you find a Decorator on the TODOOSE code base? (Hint: You implemented a Decorator in an assignment.)**

<details markdown="1">
<summary>My Answer</summary>

The `ItemView` from [Assignment 2](/assignments/2) was a Decorator for the `Item` model:

```java
public class ItemView {
    private Item item;

    public ItemView(Item item) {
        this.item = item;
    }

    public int getIdentifier() {
        return item.getIdentifier();
    }

    public void setIdentifier(int identifier) {
        item.setIdentifier(identifier);
    }

    public String getDescription() {
        return item.getDescription();
    }

    public void setDescription(String description) {
        item.setDescription(description);
    }
}
```

</details>

**Modify the `FluentMap` class from above such that it acts as an Decorator for an existing `Map`. (Caveat: Technically speaking a Decorator isn’t supposed to change the interface of the decorated object; we’re deviating from the textbook here.)**

<details markdown="1">
<summary>My Answer</summary>

```java
public class FluentMap<K, V> {
    private Map<K, V> map;

    public FluentMap(Map<K, V> map) {
        this.map = map;
    }

    public FluentMap<K, V> put(K k, V v) {
        map.put(k, v);
        return this;
    }
}
```

Now you use the `FluentMap` like this:

```java
var configuration = new FluentMap<String, String>(new HashMap<String, String>())
  .put("name", "TODOOSE")
  .put("url", "https://todoose.herokuapp.com");
```

</details>

**What are advantages of the Decorator version over the previous one? What are the disadvantages?**

<details markdown="1">
<summary>My Answer</summary>

In the Decorator version the client (that is, whoever is _using_ `FluentMap`) gets to choose the underlying `Map` implementation, for example, `HashMap` vs. `TreeMap`. This can also be a disadvantage, after all, [convention over configuration](/lectures/2#convention-over-configuration), and most times you don’t care about the specific implementation. But it can also be an advantage if you care about the specific implementation.

The Decorator version is more verbose to use.

The Decorator version works over existing objects, including those you didn’t create yourself.

</details>

**What [principles](/lectures/2) are you following or breaking when you use this design pattern?**

<details markdown="1">
<summary>My Answer</summary>

You’re not repeating yourself, because the decorator delegates to the decorated object whenever possible, but the decorated object may now fulfill multiple responsibilities, breaking the single responsibility principle.

</details>

# Conclusion

- Do you design or just code? If you design, do you do it before the code, or as a way to see the patterns that emerged from coding?
- Watch the rest of the TODOOSE video series, because next week we’ll start talking about implementation.
- [Assignment 3](/assignments/3) is out.
