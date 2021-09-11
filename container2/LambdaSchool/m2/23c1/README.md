# Module Project: Forms - Team Builder

This project allows you to practice the concepts and techniques learned in this module and apply them in a concrete project. This module explored Form management in React. You learned about controled inputs, semantic HTML, some ES6 tools like the spread operator and computer properties, and synthetic events. In your project you will demonstrate proficiency of these subjects and principles by creating an application using each of these.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this project.**

### Commits

Commit your code regularly and meaningfully. This helps both you and your team lead in case you ever need to return to old code for any number of reasons.

### Description

In this project you'll build an app that will keep track of memebers of a team. You'll be able to add members to this team as well as edit their details.

## Project Set Up

- [X] Create a forked copy of this project.
- [X] Add your team lead as collaborator on Github.
- [X] Clone your OWN version of the repository in your terminal
- [X] Use `npx create-react-app team-builder` or `create-react-app team-builder` to initiate the project.
- [X] CD into your `team-builder` directory
- [X] Using the same command tool (yarn or npm) start up the app using `yarn start` or `npm start`
- [X] Create a new branch: git checkout -b `<firstName-lastName>`.
- [X] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
- [X] Push commits: git push origin `<firstName-lastName>`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge <firstName-lastName> Branch into master (student's Repository). **Please don't merge your own pull request**
- [ ] Add your team lead as a reviewer on the pull-request
- [ ] Your team lead will count the project as complete by merging the branch back into master.
- [X] Do your magic!

## Minimum Viable Product

- [X] Render a list of team members from state
- [X] Build a form to add a new member to the list of members

### STEP 1 - Setup your state

- [X] Import the `useState` hook and set up a state property for your team members list

- [X] Give the state variable you just declared a default value. You will need to keep track of a list of team members and each team member will have several key/value pairs associated with them.

- [X] Render your list of team members

### STEP 2 - Build your form

- [X] In `Form.js` build out your markup
- [X] Build inputs for `name`, `email` and `role` (backend engineer, frontend engineer, designer, etc. Use your imagination)
- [X] Import the useState hook and utilize what we learned about two-way data binding
- [X] Render your `Form` component in `App` and pass a setter method (the `set_____` method from your team members state in `App`) down to it so you can add team members to your state.

Now you are finished with MVP! Move on to the stretch goals at the bottom. The first is to add the functionality to edit members. As this is a very complicated process, steps have been included here to help you through that.

### STEP 3 - Add the edit functionality (STRETCH)

Next we're going to reuse the `Form` component to edit team members

**Get App.js ready for editing members**
- [ ] Add an edit button, or an edit icon next to each member you are rendering. When the button/icon is clicked, we want to set that member to a state property in `App` called `memberToEdit`. The function to do this should live in `App`, even if the button/icon invoking it are in a different component. Just pass the function down as a prop.

**Get Form.js ready to edit members**
- [ ] Pass `memberToEdit` down to `Form.js`
- [ ] If `Form` receives `props.memberToEdit`, then that member object should populate your state object that is controlling your forms. Now, it may be tempting to do something like this: `const [member, setMember] = useState(props.memberToEdit || {name: '', email: '', role: ''})` for our form to update with whatever member we click on. However, this is a trap that will cause a pretty big bug in our app. If props are used to set state like this, the state property will _NOT_ update when the prop changes. So... what kind of technique have we learned to keep something in sync with props when they change? `useEffect`! Write an effect that syncs with `props.memberToEdit`. When `props.memberToEdit` changes, the effect will update the `member` state object with the new data. This will populate the inputs with whichever member we are trying to update.

The flow for editing is hard to conceptualize. It should go something like this:

1. Our user clicks the `Edit` button/icon to start editing a team member
2. A function in App is invoked that sets the clicked member to `memberToEdit` on state
3. `Form.js` is receiving `memberToEdit` as a prop, and if that prop changes, the effect we built will set that object to state and populate the form with that member's info
4. The user updates the member info
5. Uh... now what do we do with this new data? If we submit the form, it will just add a new member 😫. Never fear! We will fix this in the next section!

### STEP 4 - Form submit (STRETCH CONT.)


This is an interesting bit of architecture we've done so far. We have built a reusable form that can be used to add a team member, or edit a team member. The last piece of the puzzle is this - when we submit the form, do we run an `addMember` function, or an `editMember` function? And how will the form know? Well, our form knows if we are editing a team member by whether or not there is the prop `memberToEdit`. (P.S. This can also be done with a boolean - something like `isEditing`...)

Okay, now that we understand how `Form.js` knows if we are editing or creating members, we can finish this app!

- [ ] Create a new function in `App.js` called `editMember` that will edit one or more of the details of a team member and pass it down to the second form component. You'll have to find a way to loop over the data in your state, find the specific team member you intend to edit, and finally change the details with the data sent up to you from the second form component. `.map()` will be your friend for that task. You'll also want to avoid directly mutating your data. The `...` spread operator will be your friend there.
- [ ] On form submit, do an `if` check to see if the `memberToEdit` prop is there or not, and run the correct functions in the `if` and `else` blocks based on that check.

Observe the power of reusability!

## Stretch Problems

After finishing your required elements, you can push your work further. These goals may or may not be things you have learned in this module but they build on the material you just studied. Time allowing, stretch your limits and see if you can deliver on the following optional goals:

- [ ] Follow the steps above to edit members. This is difficult to do, and the architecture is tough. But it is a great skill to practice! Pay attention the the implementation details, and to the architecture. There are many ways to accomplish this. When you finish, can you think of another way?

- [ ] Build another layer of your App so that you can keep track of multiple teams, each with their own encapsulated list of team members.

- [ ] Look into the various strategies around form validation. What happens if you try to enter a number as a team-members name? Does your App allow for that? Should it? What happens if you try and enter a function as the value to one of your fields? How could this be dangerous? How might you prevent it?

- [ ] Style the forms. There are some subtle browser defaults for input tags that might need to be overwritten based on their state (active, focus, hover, etc.); Keep those CSS skill sharp.
