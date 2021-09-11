**COMPONENTS-CONSTURCTORS**
----------------------------------

Topics:
* Naming Conventions
* BEM
* Constructors with ES6 class syntax

You will be building on your prior work from Components-BEM by adding a `Tabs` component.

The HTML and CSS for the Tabs component and instance are provided so that you may add your prior work around it. If you have not finished Components-BEM, ask you TA for the solution.

You may need to adjust some of the naming for the usuage of `Box` in the HTML provided if it's different in your implementation.

## Description
  The `Tabs` component should be a grouping of links and associated items. Only one item is shown at a time, and each item is shown when its corresponding link is clicked. You should default to the first link and item upon page load.

  You will also be doing a more complex query with `querySelector` and Data Attributes. It's a great challenge to try to work out on your own. If it's holding you back too much, you may ask your TA for the solution to that query.

## Resources

  Data Attributes: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes

  BEM: http://getbem.com/naming/
  
  Constructors (and factory function): https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e

## Stretch Problem
  Remove the need for `Tabs` to be passed into `Tabs__link` instances. Tabs__link instances should also be unaware of their associated `Tabs__item` and should not have controll of them. All storage and selectioning of `Tabs__link` and `Tabs__item` instances should be done in `Tabs`.