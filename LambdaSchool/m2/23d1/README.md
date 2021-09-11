# Module Project: Advanced Form Management - User Onboarding
## Project Description

We've seen many different styles of form management by now -- simple to complex. Today we are going to unleash your inner form-wizard! 🧙

## Set Up The Project

- [X] Start off by installing a blank React app by using Create React App.
- [X] Add the following as dependencies inside your React app:
  - `formik`
  - `yup`
  - `axios`
- [X] Create a component file called `Form.js`, import it into your `App.js` file, and place the component in your JSX there.

## STEP 1 - Create Your Formik Form

We want to create a form to onboard a new user to our system. We need _at least_ the following pieces of information about our new user:

- [X] Name
- [X] Email
- [X] Password
- [X] Terms of Service (checkbox)
- [X] A Submit button to send our form data to the server.

## STEP 2 - Implement Form Validation and Error Messaging

Form validation is one of the facets of an application that makes it feel polished and controlled from a user perspective. With that in mind, implement the following:

- [X] Using Yup, set up _at least_ two different validations for each field along with custom error codes that will display on screen when validation fails.

## STEP 3 - Make a POST Request

Being able to `POST` data is a key skill of any developer, no matter your skill level.

- [X] Craft a `POST` request using `axios` that sends your form data to the following endpoint: _https://reqres.in/api/users_
- [X] Verify using a `console.log()` that you are receiving a successful response back

(Note: For those that are curious, we're using [reqres.in](https://reqres.in/) for this assignment's API. It's a free API that allows us to simulate a `POST` request for any data that we send it. Pretty awesome!)

## STEP 4 - Display Returned Data to Screen

When you get your data back, you will want to do something with it, right? Let's display a list of users in our app.

- [X] Set up a state property called `users` that is initialized with an empty array
- [X] Every time you make a `POST` request, and get that new user data back, update your `users` state with the new user added to the array
- [X] Render `users` in your app. This can be done in the `Form` component, or you can pass the array down to another component and render the `users` there

## Stretch Goals

The following are stretch goals that you should attempt _after_ you meet MVP for your project:

- [X] Add basic styling to your form in your app. Make it look pretty with any styling method you choose.
- [ ] Implement a dropdown menu in your Formik form. Add a `role` value to your Formik HOC and add a dropdown with different roles for your users.
- [ ] Create 3 new inputs inside your Formik form of your choice along with corresponding validation and error messaging
- [X] Add to your existing handling so that, if a user inputs their email as `waffle@syrup.com`, they receive an error message in their form that says _"That email is already taken."_
