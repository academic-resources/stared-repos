# Testing II

In this project, you will demonstrate proficiency by writing unit tests and production code to satisfy the _Minimum Viable Product_ described below.

Some of the topics covered were:

- introduction to testing a React application.
- using the `react-testing-library` testing framework.
- writing unit tests for React components.

## Instructions

**Read these requirements carefully. Understand exactly what is expected _before_ starting.**

You are allowed, and encouraged, to collaborate with your peers while working on this assignment. Remember to follow the _twenty-minute rule_ and post questions to your cohort's help channel before seeking support from your PM and Instructor.

## Commits

Please push your code often and use descriptive commit messages, this helps you and your project manager.

## Project Description

In this project, you will **write unit tests and the implementation code** for a React application for _Baseball Stadium_ personnel. The application helps them enter information about the game and have that information shown in the _Score Board Display_ for fans to see.

The requirements are listed under the _Minimum Viable Product_ section below.

## Project Set Up

Follow these steps to setup your git _fork_ and _branch_.

- [ ] Fork this repository.
- [ ] Use GitHub's website to add your project manager as collaborator on **your fork**.
- [ ] **Clone your forked version** of the repository (**Not Lambda's**!).
- [ ] Create a new branch: `git checkout -b <firstName-lastName>`.
- [ ] Commit changes to your `<firstName-lastName>` branch.
- [ ] Push often to your branch: `git push origin <firstName-lastName>`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge the `<firstName-lastName>` branch into the master branch on your fork. **Please don't merge your own pull request**
- [ ] Use GitHub's website to add your project manager as a reviewer on the pull-request.
- [ ] Your project manager will count the project as complete by merging the branch back into the master branch of your forked repository.

## Minimum Viable Product

After a set of interviews with the potential users of the solution, we gathered the following information about the desired functionality. Not all the information provided by our clients is relevant to the design of the solution, but it's included to help understand the requirements.

Your job is to design and build a React application that includes at least two components: `Display` and `Dashboard`. **For the MVP you only need to record information about a player's _"at bat"_**.

The specifications are listed below.

### Count Rules

- balls and strikes reset to 0 when a player reaches 3 strikes or 4 balls.
- balls and strikes reset to 0 when a `hit` is recorded.
- a `foul` increases strikes up to 2. With no strikes, a foul makes it 1 strike. With 1 strike, a foul makes it 2 strikes. With two strikes a foul has no effect, count stays at 2 strikes.

### Display

- display the count of `balls` and `strikes` for the at-bat.
- should be updated when the user records activity on the `Dashboard` component.

### Dashboard

- provide a button that the person in charge can press every time there is a `strike`, `ball`, `foul` or `hit`.
- there is **NO** need to specify the type of hit (single, double, etc).
- changes recorded on this component should update the information shown by the `Display` component.

Feel free add other components and organize and name your components any way you want to satisfy the requirements. **Make it up and make it happen developer!**.

## Stretch Problem

This section is **optional** and not counted towards MVP. Start working on it after you're done with the main assignment.

- Expand the solution to keep track of all the activity of a single inning. Include the number of outs and track them.
- Expand the solution to keep track of the number of runs and errors in the inning.
- Expand the solution to keep track of which bases are occupied and to record hits, doubles, triples and home runs.
- Expand the solution to keep track of all activity across all innings. Display the current inning.
- Work on [this repository for extra practice testing a legacy React application](https://github.com/LambdaSchool/React-Testing).
