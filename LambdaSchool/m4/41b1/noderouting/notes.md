Dont

- GET /list-routines
- POST /new-routine, /create-routine, /routines/new

DO

- GET /routines
- POST /routines

- everything is a resource
- resources live at a URI/L
- operations on those resources are expressed using HTTP methods
- hypermedia (HATEOAS) => links

## Exercise Journal

- view list of `journals`
- vew a list of `exercises`
- add a new exercise
- view a list of `users` to follow
- view a list of my followers
- register for an `account`
- login/logout
- update my `profile`
- view a users's public profile
- view the sets for a workout
- view the exercises for a workout
- view (GET) all workouts that include pushups => filter

https://www.google.com/search
? <= the beginning of the query string
q = rest+api
&
rlz = 1C5CHFA_enUS885DO886
&
oq = REST+API
&
aqs = chrome.0.0l8.6503j0j8
&
sourceid = chrome
&
ie=8
&
active=true

```js
req.query = {
  q: "rest api",
  rlz: "1C5CHFA_enUS885DO886",
  ie: "8",
  active: "true",
};
```

20 resources x 5 => 100 endpoints.

## Resources

- accounts/users => `/api/users`
- exercises => `/api/exercises`
  - create => POST `/api/exercises`
  - details => GET `/api/exercises/:id`
- routines => `/api/routines`
- workouts: a group of sets => `/api/workouts`
  - sets => /api/workouts/:id/sets
  - exercises => /api/workouts/:id/exercises/
- splits
- sets: have reps => exercise
- muscle groups
- profiles <- same as account?

Monday Workout

- 3 sets of 10 pushups
- 3 sets of 8 lat pull downs
- 3 sets of 10 sit ups

What ways of sending information from the client to the server have we seen so far?

- query string => `req.query`
- url parameters => `req.params`
- body => `req.body`
- headers => `req.headers`
