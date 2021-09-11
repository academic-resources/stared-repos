# HTTP Movies

## Instructions

- **Fork** this repository, then clone your fork.
- Run `yarn` to download dependencies.
- Run the server using `yarn start` or `node server.js`.
- In a separate terminal cd into the `client` folder and run `yarn install` to download dependencies.
- Still inside the `client` folder run `yarn start` to run the client application.

### Part 1 - Updating A Movie:

- Add a route at the path `/update-movie/:id`
- Create a component with a form to update the chosen movie
- Add a button in the movie component that routes you to your new route with the movies's id as the URL param
- The form should make a PUT request to the server when submitted
- When the call comes back successfully, reset your form state and route the user to `/movies` where they will see the updated movie in the list

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

- Add a delete button in the movie component that makes a DELETE request
- When the call comes back successfully, route the user to `/movies` where they will see the updated movie list without the deleted movie

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
