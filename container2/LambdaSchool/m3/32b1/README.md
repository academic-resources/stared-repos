# Module Project: The Reducer Pattern - Reducer Todo

This project allows you to practice the concepts and techniques learned in this module and apply them in a concrete project. This module explored the reducer pattern. During the module, you studied what immutability is, what reducers, actions and dispatch are, and how to use the reducer hook. In your project you will demonstrate proficiency of these subjects and principles by creating an application using each of these.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this project.**

### Commits

Commit your code regularly and meaningfully. This helps both you and your team lead in case you ever need to return to old code for any number of reasons.

### Description

In this project, you build an app that let's you display a todo list from reducer state, and update todo items as completed and clear completed todos from the list by dispatching different actions.

## Project Set Up

- [X] Create a forked copy of this project.
- [X] Add your team lead as collaborator on Github.
- [X] Clone your OWN version of the repository in your terminal
- [X] CD into the project base directory `cd reducer-todo`
- [X] Create a new react app using CRA
- [X] Using the same command tool (yarn or npm) start up the app using `yarn start` or `npm start`
- [X] Create a new branch: git checkout -b `<firstName-lastName>`.
- [X] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
- [X] Push commits: git push origin `<firstName-lastName>`.

Follow these steps for completing your project.

- [X] Submit a Pull-Request to merge <firstName-lastName> Branch into master (student's Repository). **Please don't merge your own pull request**
- [X] Add your team lead as a reviewer on the pull-request
- [X] Your team lead will count the project as complete by merging the branch back into master.
- [X] Do your magic!

## Minimum Viable Product

1. - [ ] Set an initial state value through a reducer and render a list of todos from that state
1. - [ ] Add a form that dispatches an "ADD_TODO" action to be able to add a todo item to your list
1. - [ ] Build a function that let's you mark todo items as completed when you click on them
1. - [ ] Build a function that let's you clear completed todos when you click on a "Clear Completed" button

### STEP 1 - Build a simple reducer and initial state

- [X] In a folder called `reducers` add a reducer file and build out a simple reducer with just a default return for now
- [X] In the same file, build your initial state object that has a list of todos with the following shape:

```js
{
  item: 'Learn about reducers',
  completed: false,
  id: 3892987589
}
```

- [X] Export both the reducer and the initial state object

### STEP 2 - Set up state in your component

You get to choose how you want to set up your components. Please don't just do this all inside App. I know it is a small and simple project, but you will do yourself a great service by setting your app up as if it were going to be a larger application

- [X] Using the `reducer` hook, set up state in your component. Think about what you'll need in order to use the reducer hook, and think about what it returns.
- [X] Now render your list of todos from your reducer in your app

### STEP 3 - Adding todos

- [X] Build a form to add todos to your list
- [X] Build a function that will dispatch an action to add a new todo
- [X] Write the `case` in your reducer for adding a todo (You can create a unique id with `new Date()`)

### STEP 4 - Toggle the completed field

- [X] Build a function that will dispatch an action to toggle a todo's completed field
- [X] Invoke this new function when you click on a todo
- [X] Style your todo to somehow show that it is completed (be creative here!)
- [X] Write the `case` in your reducer for toggling the completed property

### STEP 5 - Clearing completed todos

- [X] Build a function that will dispatch an action to filter out any completed todos
- [X] Invoke this new function when you click on a "Clear completed" button
- [X] Write the `case` in your reducer for filtering completed todos

## Stretch Problems

After finishing your required elements, you can push your work further. These goals may or may not be things you have learned in this module but they build on the material you just studied. Time allowing, stretch your limits and see if you can deliver on the following optional goals:

- [ ] Add the moment library to show in "human speak" when a todo was completed
- [ ] Add a property on the todos for when a todo should be completed by. Then display that a todo is "overdue" if it has not been completed by its due date
- [ ] Add "tags" to your todos, and display them with your todo list
- [X] Have fun with the styling. Make this something you'd be proud to show off!
