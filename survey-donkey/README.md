# SurveyDonkey
SurveyDoneky is an interactive survey creation and participation site inspired by SurveyMonkey. Designed using PUG templates for HTML and Bulma for CSS on the front end, with express and sequelize to handle the back end.

[SurveyDonkey Live](https://thesurveydonkey.herokuapp.com/)

For initial design documents, please visit the [wiki](https://github.com/about14sheep/survey-donkey/wiki).

Mady by:
- Austin Burger [github](https://github.com/about14sheep) | [linkedin](https://www.linkedin.com/in/austin-burger/)
- Daniel Ramirez [github](https://github.com/danieldotcom2)
- Greg Lloyd [github](https://github.com/Greg001100) | [linkedin](https://www.linkedin.com/in/greglloyd1/)
- Zachery Haley [github](https://github.com/Zackitty) | [linkedin](https://www.linkedin.com/in/zachery-haley-90a1a21b1/)

SurveyDonkey allows users to:
- Create an account and log in and out securely.
- Create, edit, publish, delete and share their own surveys.
- Add unique questions to their surveys, with options for multiple choice, scroll, and free response.
- See the results of any public survey, as well as see what responses they gave to a particular survey.
- See a feed of all public surveys.
- Upvote their favorite surveys.

## Technology Used:
- PUG templates
- PostgreSQL
- Express
- JSON web tokens
- Sequelize
- BCrypt
- Bulma CSS

## Main Views:
**User dashboard**

When logged in, users are greeted with their dashboard. This is the command center for the app that allows users to see all of their created surveys along with general statistics. From here they can create new surveys, edit old drafts, see results of a survey, share or delete a survey.
![](https://github.com/about14sheep/survey-donkey/blob/master/sdDashboard.png)

**Survey creation and editing**

Users can create surveys by first choosing a name, then working on what questions they want to include. Each question can be multiple choice, free response, or scroll. Users can save the survey as a draft and come back later to edit or finish questions. Once published, the survey will not be editable and will show up on the main public feed for all users to see and fill out.
![](https://github.com/about14sheep/survey-donkey/blob/master/sdSurveyCreate.png)

**Survey Results**

The results of a survey are shown using charts for multiple choice questions or a list of anonymous responses for free response questions. If a user has already taken the survey in question, their response will be highlighted. 
![](https://github.com/about14sheep/survey-donkey/blob/master/sdResults.png)

**Public Survey Feed**

The public feed shows all of the published surveys, as well as their creator and relative stats. Users can take a survey, upvote a survey, and sort surveys by owner, name, creation date, questions, and upvotes. 
![](https://github.com/about14sheep/survey-donkey/blob/master/sdFeed.png)

## The Front End
For the front End we used PUG for the multi-page application because it was very light weight and had great dynamic programming opportunities due to its uese of mixins and its ability to reuse components. 

```
extends layout.pug

include utils.pug

block content
  link(rel="stylesheet" type="text/css" href="/styles/login.css")
  div(class="columns")
    div(class="column")
    div(class="column has-background-light my-6")
      +validationErrorSummary(errors)
      form(action='/login' method='post' class="")
        input(type='hidden' name='_csrf' value=csrfToken)
        +field('Email Address: ', 'email', email)
        +field('Password: ', 'password', null, 'password')
        div(class='py-4 has-text-centered')
          button(type='submit' class='button is-success') Login
        div(class="has-text-centered")
          p: a(href='/sign-up') Don't have an account?

    div(class="column")
  div(class='py-4 has-text-centered')
      form(action='/login' method='post')
        input(type='hidden' name='_csrf' value=csrfToken)
        +demofield('Email Address: ', 'email', 'demo@surveydonkey.com')
        +demofield('Password: ', 'password', 'P4ssword!', 'password')
        button(type='submit' class="button is-success is-light") Demo User Login
        
  include footer.pug
  ```
For the CSS we used the Bulma library as it allowed us to quickly and efficiently replicate the look of Survey Monkey.

## The Back End
The backend server was ran with Node.js' Express framework for the server and Sequelize ORM for the database. Using SQL queries and some clevel manipulation of data structures we were able to serve API calls from the front end so it could display the surveys by several different options.

```
router.get('/feed/upvotes', asyncHandler(async (req, res) => {

    const upvoteFeedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote]
    });

    function merge(leftArray, rightArray) {
        const sorted = [];
        while (leftArray.length > 0 && rightArray.length > 0) {
          const leftItem = leftArray[0];
          const rightItem = rightArray[0];

          if (leftItem.Upvotes.length > rightItem.Upvotes.length) {
            sorted.push(rightItem);
            rightArray.shift();
          } else {
            sorted.push(leftItem);
            leftArray.shift();
          }
        }

        while (leftArray.length !== 0) {
          const value = leftArray.shift();
          sorted.push(value);
        }

        while (rightArray.length !== 0) {
          const value = rightArray.shift();
          sorted.push(value);
        }

        return sorted
      }

      function mergeSort(array) {
        const length = array.length;

        if (array.length < 2){
          return array;
        }

        const middleIndex = Math.ceil(length / 2);
        let leftArray = array.slice(0, middleIndex);
        let rightArray = array.slice(middleIndex, length);

        leftArray = mergeSort(leftArray);
        rightArray = mergeSort(rightArray);

        return merge(leftArray, rightArray);
      }

    let upvoteSorted = mergeSort(upvoteFeedSurveys).reverse();
    res.render('feed', {
        title: "SurveyDonkey Feed",
        upvoteSorted
    })
}))
```
