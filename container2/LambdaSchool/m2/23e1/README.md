# Sprint Challenge: Single Page Applications

## Rick & Morty Edition

This challenge allows you to practice the concepts and techniques learned over the past Sprint and apply them in a concrete project. This Sprint explored Single Page Applications, React Router I - II, and React Forms.

## Instructions

**Read these instructions carefully. Understand exactly what is expected *before* starting this Sprint Challenge.**

This is an individual assessment. All work must be your own. Your challenge score is a measure of your ability to work independently using the material covered through this sprint. You need to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

You are not allowed to collaborate with students during the Sprint Challenge. However, you are encouraged to follow the twenty-minute rule and seek support by reaching out through DM to your TL.
You have **three hours to complete** this challenge. **Plan your time accordingly.**

## Commits

In case you ever need to return to old code. Remember your **ABC: Always Be Committing!**

## Description

In this challenge, you will create a Single Page Application complete with Client-Side Routing. It must consume a 3rd party API service (based on the TV show [Rick and Morty](https://rickandmortyapi.com/documentation).)

## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question.

- [ ]  Explain benefit(s) using `client-side routing`?

> Answer: It's much more efficient than the traditional way, because a lot of data isn't being transmitted unnecessarily.

## Project Set Up

Follow these steps to set up and work on your project:

- [X]  Create a forked copy of this project.
- [X]  Add TL as collaborator on GitHub.
- [X]  Clone your OWN version of Repo (Not Lambda's by mistake!).
- [X]  Create a new Branch on the clone: `git checkout -b <firstName-lastName>`.
- [X]  Implement the project on this branch, committing changes regularly.
- [X]  Push commits: `git push origin <firstName-lastName>`.
- [X]  **LOOK** at your project directory and notice it's just a plain ol' React App that we've built using `create-react-app`.
- [X]  **RUN** `yarn install` or `npm install` to retrieve the client-side dependencies.
- [X]  **RUN** `yarn start` or `npm start` to fire up your React application.

### Exceeded rate limits?

<details>
<summary>⚠️ Expand for alternate API URL</summary>

If the [main API service](https://rickandmortyapi.com/documentation) goes down, or you exceed rate limits, try the following URL:

**[Backup URL:](https://rick-api.herokuapp.com/api/)** `https://rick-api.herokuapp.com/api/`

You can still be locked out - watch your [chrome devtools' network panel](https://developers.google.com/web/tools/chrome-devtools/network/reference) to make sure you aren't making too many requests.
</details>

## Minimum Viable Product (MVP)

> The MVP of this project is broken up between a couple parts.
Construct a Single Page Application with React.

**Your finished project must include all of the following requirements:**

_Display Data from a Server API_
- [X]  Fetch a list of characters from the Rick and Morty API's Characters endpoint *`https://rickandmortyapi.com/api/character/`* and render them to the screen.
- [X]  You must display at least one element for each character.

_Add a Router to this application using [React Router](https://reacttraining.com/react-router/web/guides/quick-start)._
- [X]  Hook up the Welcome page(Home page) and a Characters page with React Router.
- [X]  Use a styling or component library for part of or all of your application. (Pick at least 1 of: [s](https://react-bootstrap.github.io/)tyled-components or Reactstrap).

_Add 'Search by Name' feature._

- [X]  Add the `<SearchForm />` component (see `./components/SearchForm.js`).
- [X]  Create a search form that will filter through the data displayed in the character list.

### **Required best practices:**

- [X]  Consistent naming. Examples: variables, functions, Components, and file/folder organization.
- [X]  Consistent spacing. Examples: line breaks, around arguments and before/after functions.
- [X]  Consistent quotation usage.
- [X]  Spell-check.
- [X]  Schedule time to review, refine and reassess your work.

It is better to submit a challenge that meets [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) than one that attempts too much and fails.

---

> 🚀 Pro Tip: Complete as many stretch goals as possible! Even after the Sprint Challenge! You'll get a head start on important upcoming concepts!

## STRETCH GOALS 💪

There's a range of difficulty in the options below. 😈

*Note:* The most difficult stretch goal(s) could take an expert an hour or more.

Start with the most *familiar (or fun) sounding* stretch goal.
Complete search component to your list views.
- [X] Try adding 2 more components and display data from the episodes and locations end point.
- [ ] https://rickandmortyapi.com/api/location/ - docs
- [ ] https://rickandmortyapi.com/api/episode/ - docs

- [ ]  Wire up the `onSearch(name)` callback prop to support [querying the API](https://rickandmortyapi.com/documentation/#filter-characters). (To search for `rick`, you would request `/api/character/?name=rick`.)
- [ ]  Animate page transition and/or card loading.
- [ ]  Persist search form field(s) by using the custom hook `useLocalStorage`.
- [X]  Add error handling for all async (axios/AJAX) calls. (Including some styled UI.)
- [ ]  Add a "details view" and route to show more details for each type of record. (Hint: Look into route parameters or nested routes.)
- [ ]  Similar to the "details view" now with a UI twist: use a [modal](https://react.semantic-ui.com/modules/modal/#variations-size) component to show item view. (If you can, build [modal with routes](https://codesandbox.io/s/react-router-modal-gallery-classes-example-z98l5).)
- [ ]  Add [paging support](https://react.semantic-ui.com/addons/pagination/#types-pagination) (next/previous links.)
- [ ]  Refactor to use as few Components as possible - while still readable to a React Dev. (Hint: research these patterns: HoC, render props, FaaC.)
- [X]  Add additional fields to search form. They are unique for each endpoint. See **[Available parameters**.](https://rickandmortyapi.com/documentation/#filter-characters), etc..
- [ ]  Use the [GraphQL Endpoint](https://rickandmortyapi.com/documentation/#graphql) with multiple search fields.

> 💡Reminder: git commit -am 'Stretch Progress 💪'

## Completing

> Follow these steps to complete your project:

- [ ]  Submit a Pull Request to merge `<firstName-lastName>` branch into master (student's repo).
- [ ]  Add your TL as a Reviewer on the Pull Request.
- [ ]  TL then will count the HW as done by merging the branch into master.

<!-- TLs: NOTE: use resources to coach, or share over zoom - avoid sharing entire solution folder. Share preview links if available. -->

> Note: AFTER Sprint Challenge: Solutions to many stretch goals (and live demo URLs) are available from TLs (or GitHub admins.)

There are many ways to implement each of these requirements!
