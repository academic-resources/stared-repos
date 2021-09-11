# Module Project: Component Lifecycle Methods - React Github User Card

This project allows you to practice the concepts and techniques learned in this module and apply them in a concrete project. This module explored lifecycle methods in class components. In your project you will demonstrate proficiency of these concepts by recreating the Github User Card project, but as a React application this time.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this project.**

### Commits

Commit your code regularly and meaningfully. This helps both you and your team lead in case you ever need to return to old code for any number of reasons.

## Project Set Up

- [ ] Create a forked copy of this project.
- [ ] Add your team lead as collaborator on Github.
- [ ] Clone your OWN version of the repository in your terminal
- [ ] Use CRA to create a new React app in this repository
- [ ] Create a new branch: git checkout -b `<firstName-lastName>`.
- [ ] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
- [ ] Push commits: git push origin `<firstName-lastName>`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge <firstName-lastName> Branch into master (student's Repository). **Please don't merge your own pull request**
- [ ] Add your team lead as a reviewer on the pull-request
- [ ] Your team lead will count the project as complete by merging the branch back into master.
- [ ] Do your magic!

## Minimum Viable Product

- [ ] Fetch data from the Github API for a Github user
- [ ] Display the user data on the DOM
- [ ] Use class components when you need to hold any state or use any lifecycle methods

## Planning your App

This is an important step for any project you will be working on. You will want to plan out what data you will need, which component will manage that data via state, what functions you may need to update that state, and where you need to pass the data to render it to the DOM. I love to use pen and paper or a whiteboard for this. The visuals can help a lot when you're deep into your code. After I finish that, I will write out a list of steps that I think it will take to build the app. This gives me a starting point, and direction as I proceed. This list always changes a bit as you are building, but it should give you a good flow and some good anchor points.

Also, since you have used the Github API before, you know some of the gotchas. Make sure to plan and watch for those.

When you have those completed, you're ready to start coding!

## STEP 1 - Fetch the User Data

- When your component mounts, send a GET request to the following URL (replacing the palceholder with your Github name):
  - https://api.github.com/users/<your name>
- After you fetch your data, set it to state

## STEP 2 - Display the User Data

- Pass the data to the component that will be displaying it
- Build out a user card using the data that the Github API returns to you
  - You may reference your old project for this, or you may wish to build this from scratch yourself

## STEP 3 - Fetch the User's Followers

- When your component mounts, you will also fetch the user's followers using this endpoint:
  https://api.github.com/users/< Your github name >/followers
- Set that data to state as well, and display the data in your app

## STEP 4 - Style the User Card

- Now it's time to style up your app
- You are free to choose how you style your app, but make it look as presentable as you can
- Try something new here. Maybe that's a new CSS technique you haven't really practiced yet. Maybe it's using a styling library you haven't tried. Push yourself to get better in this area.

## STEP 5 - Project Retrospective

Now that you have completed the MVP, I want you to think about the process it took you to get here. Is there anything you wish you had planned better? Anything you would do differently? Now take a minute think about how you would accomplish these same objectives with function components and hooks. You have experience with both formats now, so you can form opinions, but more importantly, you can back up those opinions. That's a really exciting level to be at! If you have time now, go ahead and move onto the stretch problems.

## Stretch Problems

After finishing your required elements, you can push your work further. These goals may or may not be things you have learned in this module but they build on the material you just studied. Time allowing, stretch your limits and see if you can deliver on the following optional goals:

- Build a form that allows you to search for different Github users. When the form is submitted, use `componentDidUpdate` to fetch the data for the user you typed in. Set that new user's data to state to trigger the component to rerender and display your new user. Don't forget to fetch their followers as well.

- Look into adding your GitHub contribution graph. There are a number of different ways of doing this, this Stack Overflow discussion will get you started: https://stackoverflow.com/questions/34516592/embed-github-contributions-graph-in-website
