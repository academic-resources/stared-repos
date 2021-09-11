import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

/*  
Lambda colors: 

red #bb1333
navy #383651
blue #233D6E
nav menu gray 1 #707486
copyrightgray #4C5962
black #14131C

track icon colors:
ds #66F2FF
web #373459
ios df173C
ux #204C8C
*/

/*
Slack plan

When user sends message to bot /helpdesk:
	-- initiate ticket
	-- send back notification
	-- subscribe command

*/

/* 

	// Student created functional components and used events in application to add dynamic functionality to app.
	// Student's code was organized at the component level
	// proper usage of state and props are demonstrated throughout the project
	// the UI is composed of small reusable components
	// proper usage of useState and useEffect hooks are clearly incorporated and correctly implemented. 
	// Student used Array methods to dynamically render HTML elements.
	// Student implemented GET requests using either Axios or Fetch to display 3rd party data on a deployed page. 
	// Route management properly installed and used to show top level pages as well as nested views where necessary.
	// Student has set up component management for the forms in the app that makes sense for each form. 
	// Student made the decision to use a third-party library, like Formik, or not, and can defend their decision. 
	// Some form validation is in place.
	// Student's work demonstrates that all MVP features were built


Score 3:
	// Student showed great insight in setting up the state management for the app's forms. 
	// Form validation is in place for all fields, and covers all use cases. 
	// Loading states and success/error notifications are in place and add to the overall UX of the app.
  	// Not only are standard network request techniques employed, the code is organized in such a fashion that the student demonstrated proper use of container vs presentational components or other industry standards, conventions or patterns.
	// Student was able to architect components to be easily reused. 
	// Student's work demonstrates that all MVP features were built.
	// Student went above and beyond the project (search function?).
	// Pair programmed with the Web UI and Back end Architect
	-- Student used advanced React techniques like the composition pattern, custom hooks, render props, HOCs, etc.
	-- Student incorporated a third party event/animation library like unto Greensock, Anime, React-motion etc.

	MVP
	// Two user types: Student and Helper
	// As a student I want to log in and have the ability to see tickets that are currently open for help. 
	// As a student I want to be able to create a new help ticket with a title, description, what I've tried and a category (i.e. React).
	// As a helper I want to be able to login and see a list of open tickets. 
	// As a helper I want to be able to assign a ticket to myself by clicking a "help student" button. 
	// As a helper I want to be able to mark the ticket as "resolved", or re-assign the ticket back to the queue if I cannot resolve the ticket.


	// TODO: make helper lists closed and open on click
	// TODO: Make it so a user can be both a student and a helper. 
	// TODO: Check post requests for resolved/send to queue are correct
	// TODO: add 'help student' button to assign ticket to yourself
	// TODO: Finish Styling TicketQ
	// TODO: Finish Styling HeaderQ
	// TODO: add 'assigned' status or 'in progress' once assigned
	// TODO: Finish Styling Signup
	// TODO: add name field to sign-up page
	// TODO: sign-up post request to userinfo
	// TODO: Rearranged/changed size of login fields
	
	-- TODO: Rerender after posting new ticket not working
	-- TODO: Can't change/save profile info
	-- TODO: SLACK:  Build an integrated slack-bot that allows students to submit help tickets through slack. 
	-- TODO: SLACK:  Allow the ability to subscribe to the Queue in slack to be notified if someone opens a ticket. 
	-- TODO: Change urls for post/get/put/patch requests when backend up
	-- TODO: If time allows, redo components to streamline headers, include classes, etc
	-- TODO: If time allows, change background color of hover over ticket or alternating bg colors 
*/

