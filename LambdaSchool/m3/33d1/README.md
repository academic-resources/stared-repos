# HTTP Movies

## Instructions

- [X] **Fork** this repository, then clone your fork.
- [X] Run `yarn` to download dependencies.
- [X] Run the server using `yarn start` or `node server.js`.
- [X] In a separate terminal cd into the `client` folder and run `yarn install` to download dependencies.
- [X] Still inside the `client` folder run `yarn start` to run the client application.

### Part 1 - Updating A Movie:

- [X] Add a route at the path `/update-movie/:id`
- [X] Create a component with a form to update the chosen movie
- [ ] Add a button in the movie component that routes you to your new route with the movies's id as the URL param
- [X] The form should make a PUT request to the server when submitted
- [X] When the call comes back successfully, reset your form state and route the user to `/movies` where they will see the updated movie in the list

Movie object format:

```
{
  id: 5,
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}
```

### Part 2 - Deleting A Movie:

- [X] Add a delete button in the movie component that makes a DELETE request
- [X] When the call comes back successfully, route the user to `/movies` where they will see the updated movie list without the deleted movie

### Part 3 (Stretch) - Adding A Movie:

- Add a route at the path `/add-movie`
- Create a component with a form to add a new movie
- Each created movie should have the following format (notice the array of strings - this will test your JS skills, so work through it methodically)
- The form should make a POST request to the server when submitted
- When the call comes back successfully, reset your form state and route the user to `/movies`

Movie object format:

```
{
  id: 5,
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}
```

## Stretch Problem

- See Part 3 above (Adding movies with a POST request)
- Style the app!
