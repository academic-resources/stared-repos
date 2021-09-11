Weekend:
1. updated models/migrations for create-users. Changed name of password to hashedPassword.
2. Also modified models/migrations- made hashedPassword type STRING.BINARY
**changed firstname and lastname to camelCase*
3. Created routes/utils.js that exports csrfProtection and asyncHandler
4. Added csurf, morgan, bcryptjs to package.json
5. Made utils.pug to keep all of our mixins. added validationErrorSummary and (text)field mixin.
6. Created sign-up.js route with all necessary validations and code for hashing passwords

Monday:
7. created sign-up pug, finished sign-up router
8. created login pug and router
9. initial sign in sets user's role to fullUser, as opposed to a guest user
10. installed express-session, dotenv
11. added .env file (and example), created secret key, set up config/index.js
12. set up session cookie storage, made primitive dashboard page, login/logout functionality
13. made requireAuth middleware in auth.js that we can use to require log in for whatever route's we desire

Tuesday:
8. learning a lot of bulma
9. added important elements to dashboard page
10. specific user owned surveys query and list working

Wednesday:
11. more work with dashboard, have proper queries set up
12. merge with group, polished minor code issues
13. added cool tags, refined created/modified sections, accurate question counter,options drop down
14. create survey button/survey feed button

Thursday:
12. got total responses/most popular working
13. made delete survey feature with confirm
14. css adjustments
15. completed delete survey route, edited models to accomodate cascade deleting.
16. finally fix pugs, requireAuth bug fix
17. created demo user functionality

Friday:
18. minor css additions to splash page
19. made sign-up and login pages look good
20. made css styles more uniform across the site
21. set up auth for survey creation and editing
22. minor navbar tweaks
23. feed optimizations, added upvote button, made it work!

weekend:
24. made publish/share feature
25. sort by upvotes on feed working
26. took edit option away from published surveys



ToDo/ questions for group:
- sort by upvote
- login with github?
- already upvoted alert
- I think we need to make a 2nd sign up form for just email for users that just want to anonymously fill out a survey (guest user)
- footer?
- bonus: add icons to dropdown menus
- results only page?
- create surveys button from results?


Need before heroku final:
- add requireAuth back in to routes once they are finished
- mobile optimization check
- Readme??
- make sure shares work
