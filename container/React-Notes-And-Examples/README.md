---
description: English to Target Language Translator.
---

# Notes





## React

> React uses a syntax extension of JavaScript called JSX that allows you to write HTML directly within JavaScript

> because JSX is a syntactic extension of JavaScript, you can actually write JavaScript directly within JSX

> include the code you want to be treated as JavaScript within curly braces: { 'this is treated as JavaScript code' }

> JSX code must be compiled into JavaScript

> under the hood the challenges are calling ReactDOM.render\(JSX, document.getElementById\('root'\)\)

> One important thing to know about nested JSX is that it must return a single element.

> For instance, several JSX elements written as siblings with no parent wrapper element will not transpile.

#### Valid JSX:

```text
<div>
  <p>Paragraph One</p>
  <p>Paragraph Two</p>
  <p>Paragraph Three</p>
</div>
```

#### Invalid JSX:

```text
<p>Paragraph One</p>
<p>Paragraph Two</p>
<p>Paragraph Three</p>
```

**To put comments inside JSX, you use the syntax {/\* \*/} to wrap around the comment text.**

**To put comments inside JSX, you use the syntax {/\* \*/} to wrap around the comment text.**

The code editor has a JSX element similar to what you created in the last challenge. Add a comment somewhere within the provided div element, without modifying the existing h1 or p elements.

```text
const JSX = (
  <div>
  {/* This is a comment */}
    <h1>This is a block of JSX</h1>
    <p>Here's a subtitle</p>
  </div>
);
```

> With React, we can render this JSX directly to the HTML DOM using React's rendering API known as ReactDOM.

> ReactDOM offers a simple method to render React elements to the DOM which looks like this:

`ReactDOM.render(componentToRender, targetNode)`

* the first argument is the React element or component that you want to render,
* and the second argument is the DOM node that you want to render the component to.

> ReactDOM.render\(\) must be called after the JSX element declarations, just like how you must declare variables before using them.

> key difference in JSX is that you can no longer use the word class to define HTML classes.

* ---&gt; This is because class is a reserved word in JavaScript. Instead, JSX uses className

> the naming convention for all HTML attributes and event references in JSX become camelCase

> a click event in JSX is onClick, instead of onclick. Likewise, onchange becomes onChange. While this is a subtle difference, it is an important one to keep in mind moving forward.

### Apply a class of myDiv to the div provided in the JSX code.

* The constant JSX should return a div element.
* The div should have a class of myDiv.

```text
const JSX = (
  <div>
    <h1>Add a class to this div</h1>
  </div>
);
```

#### Ans:

```text
const JSX = (
  <div className="myDiv">
    <h1>Add a class to this div</h1>
  </div>
);
```

## React: Learn About Self-Closing JSX Tags

-Another important way in which JSX differs from HTML is in the idea of the self-closing tag.

> In HTML, almost all tags have both an opening and closing tag: `<div></div>;` the closing tag always has a forward slash before the tag name that you are closing.

> there are special instances in HTML called "self-closing tags", or tags that don't require both an opening and closing tag before another tag can start.

> For example the line-break tag can be written as `<br>` or as `<br />,` but should never be written as `<br></br>`, since it doesn't contain any content.

> In JSX, the rules are a little different. Any JSX element can be written with a self-closing tag, and every element must be closed. The line-break tag, for example, must always be written as `<br />` in order to be valid JSX that can be transpiled. A `<div>`, on the other hand, can be written as `<div />` or`<div></div>`. The difference is that in the first syntax version there is no way to include anything in the `<div />`.

### Fix the errors in the code editor so that it is valid JSX and successfully transpiles. Make sure you don't change any of the content - you only need to close tags where they are needed.

```text
const JSX = (
  <div>
    <h2>Welcome to React!</h2> <br >
    <p>Be sure to close all tags!</p>
    <hr >
  </div>
);
```

### Ans:

```text
const JSX = (
  <div>
    <h2>Welcome to React!</h2> <br />
    <p>Be sure to close all tags!</p>
    <hr />
  </div>
);
```

### React: Create a Stateless Functional Component

> There are two ways to create a React component. The first way is to use a JavaScript function.

> Defining a component in this way creates a stateless functional component.

> think of a stateless component as one that can receive data and render it, but does not manage or track changes to that data.

**To create a component with a function, you simply write a JavaScript function that returns either JSX or null**

* React requires your function name to begin with a capital letter.

> Here's an example of a stateless functional component that assigns an HTML class in JSX:

```text
// After being transpiled, the <div> will have a CSS class of 'customClass'
const DemoComponent = function() {
  return (
    <div className='customClass' />
  );
};
```

> Because a JSX component represents HTML, you could put several components together to create a more complex HTML page.

### The code editor has a function called MyComponent. Complete this function so it returns a single div element which contains some string of text.

Note: The text is considered a child of the div element, so you will not be able to use a self-closing tag.

```text
const MyComponent = function() {
  // Change code below this line



  // Change code above this line
}
```

### ANS:

```text
const MyComponent = function() {
  // Change code below this line

return (
   <div> Some Text </div >
  );

  // Change code above this line
};
```

## React: Create a React Component

> The other way to define a React component is with the ES6 class syntax. In the following example, Kitten extends React.Component:

```text
class Kitten extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hi</h1>
    );
  }
}
```

> This creates an ES6 class Kitten which extends the React.Component class.

> So the Kitten class now has access to many useful React features, such as local state and lifecycle hooks.

> Also notice the Kitten class has a constructor defined within it that calls super\(\)

> It uses super\(\) to call the constructor of the parent class, in this case React.Component

> The constructor is a special method used during the initialization of objects that are created with the class keyword. It is best practice to call a component's constructor with super, and pass props to both.

> This makes sure the component is initialized properly. For now, know that it is standard for this code to be included.

### MyComponent is defined in the code editor using class syntax. Finish writing the render method so it returns a div element that contains an h1 with the text Hello React!.

```text
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Change code below this line



    // Change code above this line
  }
};
```

### ANS:

```text
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Change code below this line
 return (
   <div>
      <h1>Hello React!</h1>
      </div>
    );


    // Change code above this line
  }
};
```

## React: Create a Component with Composition

> Imagine you are building an App and have created three components, a Navbar, Dashboard, and Footer.

> To compose these components together, you could create an App parent component which renders each of these three components as children. To render a component as a child in a React component, you include the component name written as a custom HTML tag in the JSX.

* For example, in the render method you could write:

```text
return (
 <App>
  <Navbar />
  <Dashboard />
  <Footer />
 </App>
)
```

> When React encounters a custom HTML tag that references another component \(a component name wrapped in &lt; /&gt; like in this example\), it renders the markup for that component in the location of the tag. This should illustrate the parent/child relationship between the App component and the Navbar, Dashboard, and Footer.

## Challenge:

> In the code editor, there is a simple functional component called ChildComponent and a class component called ParentComponent. Compose the two together by rendering the ChildComponent within the ParentComponent. Make sure to close the ChildComponent tag with a forward slash.

* Note:**ChildComponent is defined with an ES6 arrow function because this is a very common practice when using React**.
* However, know that this is just a function.

```text
const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        { /* Change code below this line */ }


        { /* Change code above this line */ }
      </div>
    );
  }
};
```

⌛The React component should return a single div element. ⌛The component should return two nested elements. ⌛The component should return the ChildComponent as its second child.

### Ans:

```text
const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        { /* Change code below this line */ }


        { /* Change code above this line */ }
      </div>
    );
  }
};
```





Working in code sandbox



{% embed url="https://codesandbox.io/s/twilight-snow-9c4uk?file=/src/App.js:0-569" %}





## Install create-react-app <a id="React-ModernReactwithReduxUdemyCourse-Installcreate-react-app"></a>

```text
npm install -g create-react-app
```

## Create template Project <a id="React-ModernReactwithReduxUdemyCourse-Recommendedmethodforgeneratingaproject."></a>

```text
npx create-react-app <my_app_name>
```

or

## Start the Browser <a id="React-ModernReactwithReduxUdemyCourse-StarttheBrowser"></a>

Change to the project directory:

Start VsCode

```text
code .
```

Open Browser

```text
npm start
```

with run at:

```text
localhost:3000
```

Press CTRL-C to stop the terminal.

## Minimal React application <a id="React-ModernReactwithReduxUdemyCourse-MinimalReactapplication"></a>

This application will display “Hi there!” in the browser.

Delete all files from `src` directory

Create a file with name index.js

```text
//  Import React and ReactDOM libraries
import React from "react";
import ReactDOM from "react-dom";

//  Create a React component
const App = () => {
  return <div>Hi there!</div>;
};
//  Take te react component and show it on the screen
ReactDOM.render(<App />, document.querySelector("#root"));
```

Note that the \#root element is defined in index.html

```text
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>
```





## Create React Application <a id="React-TheCompleteGuideuDemyCourse-CreateReactApplication"></a>

One time execution, command:

```text
npm install create-react-app -g
```

To create a react application, switch to the project root directory and execute:

```text
create-react-app <app_name> --scripts-version 1.1.5
```

Change to the project directory and execute command to start Browser which will reflect changes made to the application

```text
npm start
```



In code sandbox if you get an error you can always hit the refresh button to make it go away.



![](.gitbook/assets/image.png)



![](.gitbook/assets/image%20%282%29.png)

![](.gitbook/assets/image%20%283%29.png)



App function is react component which is a js function that produces jsx and handels user events..

All components are functions that return jsx







![](.gitbook/assets/image%20%281%29.png)

![](.gitbook/assets/image%20%284%29.png)

![](.gitbook/assets/image%20%285%29.png)

![](.gitbook/assets/image%20%286%29.png)



Field Component

```text
import React from "react";

export default ({ label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        className="input"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

```

After react moves through all the code that is returned from field component it moves on to the language component which once again is not a normal DOM element so it walks through the imported field jsx

This is what happens every time your browser loads the page:

![](.gitbook/assets/image%20%287%29.png)

window makes http request to code sandbox

from this request we get an index.html file to load and parse in the browser...

















































































