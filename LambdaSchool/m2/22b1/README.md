# Module Project: React-UI-Components - Lambda Calculator

In this module project you will build your very own calculator app. You have been provided with a file structure and suggested pattern for constructing your components. Be sure to connect all necessary files and pass the data using the techniques from the module.

## Instructions

---

Read these instructions carefully. Understand exactly what is expected before starting this project.

## Commits

Commit your code regularly and meaningfully. This helps both you and your team lead in case you ever need to return to old code for any number of reasons.

## Description

In this project you will build out a calculator using React. You have been given a design file to follow, and a data file to include for your button components to display.

## Project Set Up

---

This project was put together using create-react-app (CRA). You will not need to install CRA in order to make this project work. Follow the steps below to setup the project with the proper dependencies.

- [X] Create a forked copy of this project.
- [X] Add your team lead as collaborator on Github.
- [X] Clone your OWN version of the repository in your terminal
- [X] CD into the project base directory `cd lambda-calculator`
- [X] Download project dependencies by running one of these two commands `yarn` or `npm install`
- [X] Using the same command tool (yarn or npm) start up the app using `yarn start` or `npm start`
- [X] Create a new branch: git checkout -b `<firstName-lastName>`.
      Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
- [X] Push commits: git push origin `<firstName-lastName>`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge Branch into master (student's Repository). **Please don't merge your own pull request**
- [ ] Add your team lead as a reviewer on the pull-request
- [ ] Your team lead will count the project as complete by merging the branch back into master.
- [X] Do your magic!

# _Project - Lambda Calculator_

**A job just came down from the Big Boss!**

- [X] A prospective client has tasked you with building a calculator app. They need you to build the app using the file structure and component wire frame provided.
- [X] Get all necessary files connected and either taking in or sending out data.
- [X] The design file should be followed as close as possible but doesn't have to be pixel perfect - budget your time wisely.
- [X] The client will provide their own proprietary calculator software so your app only needs basic functionality, enough for a demo.

## Directions

Using the design file, build out your User Interface. Before you start, look through the app structure to see what components you have to work with, then you'll start by following the steps below.

**STEP 1**

- [ ] You have been given a Data.js file that contains some arrays.
- [ ] Find a way to bring (import) the data into the necessary files, but do not change the data.
- [ ] Data should be imported into the wrapper components (`Numbers`, `Operators`, and `Specials`)

**Step 2**
Add the data to state like this:

```js
import { numbers } from '../path/to/data';

...


const [numberState, setNumberState] = useState(numbers);
```

**Step 3**

- [X] Map over the data and dynamically render components for each piece of data in the arrays.
- [X] You will need to import the component that you'll render in the map function.

**STEP 4**

- [X] Import the wrapper button components into `App.js`
- [X] Import the display components into `App.js` as well
- [X] Compose all the components inside the `App` component to get your calculator rendering on the DOM


**STEP 5 - (STRETCH)**
- [X] In each component, start designing things to match the design file
- [X] Style your project using any of the techniques from the module
- [ ] Don't forget about className vs class on your JSX elements!!

It's time to start thinking about functionality. Before getting into this, let's try and plan out all the moving pieces you'll need.

You will have some state in `App` that will keep track of the totals. This is data that you'll pass to the display component to render in the display.

You'll also have some functions in `App` that run your calculations and update the totals state you're storing. You'll pass these functions down to the different button components as props. The button components will use `onClick` to invoke these functions and pass in the correct data, whether that's a number or an operator.

Okay. Hands on keyboard. Let's do this!

This is where you're JavaScript skills are really going to be stretched. Remember to use the 20 minute rule. Google will be your best friend!

## _MVP Requirements:_

- [X] Get at least one set of buttons(numbers, operators, or special buttons) to reflect the design spec.
- [X] Use the state hook function to get the app to display some data.

**Here is your design spec:**

<img src="https://tk-assets.lambdaschool.com/67a0a891-ba8c-429e-8d33-bc9e5b9f4e7c_ScreenShot2019-07-02at5.16.56PM.png" alt="finished calculator" width="400px" />

## Pro Tips:

- Plan your app before writing any code. How many components will you be using? And how will they fit together?
- Where will your data be stored in state? Which components need to receive that data via props?
- What functions do you need? Where will the function live (if it updates state in a component, it needs to live in that component)? Will it be invoked in a different component? If so, pass it as props!
- If you're unsure how to proceed, review the TK, google, use the help channel
- There are plenty of examples of calculator logic available, but try writing on your own. And don't worry if it isn't fully functional, you'll have time come back to it and get it working. It's actually a really fun exercise to work on in small increments over time.
- Most important have fun!!!

## Stretch Problems

Do not attempt stretch problems until MVP has been reached and a final commit has been made.

- [X] STEP 5 from above
- [ ] Finish the logic so the calculator is fully functional. Feel free to change the array data, or lose it entirely, as you see fit.
- [X] Finish styling all of the buttons and get your calculator to closely resemble the given design spec. 
- [ ] Add some icons to improve the operator characters aesthetics. Research any icon/font library and implement it into your project.
- [ ] Convert your CSS styling to use Sass/Scss
