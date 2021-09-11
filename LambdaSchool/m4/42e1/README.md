# Sprint Challenge: Node DB Sprint

## Description

In this challenge, you design and build a Data Model and a RESTful API that stores data into a Relational Database.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment, please work on it alone. It is an opportunity to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

If the instructions are not clear, please seek support from your TL and Instructor on Slack.

The Minimum Viable Product must be completed in three hours.

Follow these steps to set up and work on your project:

- [X] Create a forked copy of this project.
- [X] Add your _Team Lead_ as collaborator on Github.
- [X] Clone your forked version of the Repository.
- [X] Create a new Branch on the clone: git checkout -b `firstName-lastName`.
- [X] Implement the project on this Branch, committing changes regularly.
- [X] Push commits: git push origin `firstName-lastName`.

Follow these steps for completing your project.

- [X] Submit a Pull-Request to merge `firstName-lastName` Branch into master on **your fork, don't make Pull Requests against Lambda's repository**.
- [X] Please don't merge your own pull request.
- [X] Add your _Team Lead_ as a Reviewer on the Pull-request
- [ ] Your _Team Lead_ will count the challenge as done by merging the branch into _master_.

## Commits

Commit your code regularly and use descriptive messages. This helps both you (in case you ever need to return to old code) and your Team Lead.

## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

- [X] Explain the difference between `Relational Databases` and `SQL`.

        SQL is the language used to access a relational database.

- [X] Why do tables need a `primary key`?

        To uniquely identify each record/row.

- [X] What is the name given to a table column that references the primary key on another table.

        Foreign key

- [X] What do we need in order to have a _many to many_ relationship between two tables.

        An intermediary table that holds foreign keys that reference the primary key on the related tables. 

## Minimum Viable Product

Take the steps necessary to complete the project from scratch. Start by initializing your project with a `package.json` and go from there.

    https://dbdesigner.page.link/PPgSVdKY4gioSBGL8

Complete the following tasks:

  - [X] Design the data model and use _knex migrations_ to create the database and tables needed to satisfy the following business rules:
  - [X] a `project` can have multiple `tasks`.
  - [X] a `task` belongs to only one `project`.
  - [X] a `project` can use multiple `resources`. Example of `resources` are: computer, conference room, microphone, delivery van.
  - [X] the same `resource` can be used in multiple `projects`.
  - [X] when adding `projects` the client must provide a name, the description is optional.
  - [X] when adding `resources` the client must provide a name, the description is optional.
  - [X] when adding a `task` the client must provide a description, the notes are optional.
  - [X] when adding a `task` the client must provide the `id` of an existing project.
  - [X] for `projects` and `tasks` if no value is provided for the `completed` property, the API should provide a default value of `false`.
- [X] Build an API with endpoints for:
  - [X] adding resources.
  - [X] retrieving a list of resources.
  - [X] adding projects.
  - [X] retrieving a list of projects.
  - [X] adding tasks.
  - [X] retrieving a list of tasks. **The list of tasks should include the project name and project description**.

### Entities

A `project` is what needs to be done. We want to store the following data about a `project`:

- [X] a unique ID.
- [X] a name. This column is required.
- [X] a description.
- [X] a boolean that indicates if the project has been completed. This column cannot be NULL, the default value should be `false`.

A `resource` is anything needed to complete a project, some examples are: a person, a tool, a meeting room or a software license. We want to store the following data about a `resource`:

- [X] a unique ID.
- [X] a name. This column is required.
- [X] a description.

The database should not allow resources with duplicate names.

A `task` one of the steps needed to complete the project. We want to store the following data about an `task`.

- [X] a unique ID.
- [X] a description of what needs to be done. This column is required.
- [X] a notes column to add additional information.
- [X] a boolean that indicates if the task has been completed. This column cannot be NULL, the default value should be `false`.

## Stretch Problem

This section is **optional** and not counted towards MVP. Start working on it after you're done with the main assignment.

- [ ] Add an endpoint for retrieving a `project` by its `id` that returns an object with the following structure:

```js
{
  id: 1,
  name: 'project name here',
  description: 'the project description',
  completed: false,
  // or true, the database will return 1 for true and 0 for false, extra code is required to convert a 1 to true and a 0 to false.
  tasks: [
    {
      id: 1,
      description: 'task description',
      notes: 'the task notes',
      completed: false // or true
    },
    {
      id: 7,
      description: 'another task description',
      notes: 'the task notes',
      completed: false // or true
    }
  ],
  resources: [
    {
      id: 1,
      name: 'Lambda Student',
      description: 'a soon to be hired developer'
    },
    {
      id: 2,
      name: 'MacBook Pro #1'
      description: 'an overly expensive laptop computer'
    }
  ]
}
```

- [X] Add the remaining CRUD operations for projects and tasks.

- [X] Use `knex` to add _data seeding_ scripts for projects and tasks.

- [X] Add support for the concept of `contexts`. A context is something like _at home_, _at work_ or _at computer_. The idea is that some tasks require one or more `contexts` in order to be worked on. For example, the task of _file income taxes_ may require that you are _at home_, _at computer_ and _online_ so if you are _at work_ and look at the list of pending tasks you could do in your current context, filing your taxes will not be one of them.

- [X] A `context` can be applied to more than one `task`. An task can be tied to more than one context, like in the example above.

- [X] When retrieving an `task` by _id_, add a property that lists all the `contexts` related to that task.

_Good luck and have fun!_
