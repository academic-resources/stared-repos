# Building an API using a Node.js and Express
 
## Topics

- Building RESTful APIs.
- Performing CRUD Operations on Multiple Resources.
- Configuring CORS.
- Writing Custom Middleware.
- Using Express Routers to Modularize Application.

## Assignment

- Use Node.js and Express to **design and build** an API that performs CRUD operations on `users` and `posts`.
- Write custom middleware to ensure that the user's `name` is uppercased before the request reaches the `POST` or `PUT` route handler.
- **You will work on this assignment over the course of TWO days**
- **The endpoints for managing users and the middleware to uppercase the user's name are due on Wednesday, the posts endpoints are due on Thursday**.

### Download Project Files and Install Dependencies

x **Fork** and **Clone** this repository.
x **CD into the folder** where you cloned the repository.
x Do your magic!

### Database Persistence Helpers

The `/data/helpers` folder includes helper files that you can use to manage the persistence of _users_ and _posts_ data. These files are `userDb.js` and `postDb.js`. Both files publish the following api:

- `get()`: calling find returns a promise that resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if found.
- `insert()`: calling insert passing it a resource object will add it to the database and return an object with the id of the inserted resource. The object looks like this: `{ id: 123 }`.
- `update()`: accepts two arguments, the first is the `id` of the resource to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `userDb.js` helper includes an extra method called `getUserPosts()` that when passed a user id as it's only argument, returns a list of all the posts for the user.

**All helper methods return a promise.**

#### Database Schemas

The _schemas_ (properties and data type of each property) used to store and retrieve the resources inside the included database (`lambda.sqlite3`) is described below.

##### Users

- id: number, no need to provide it when creating users, the database will generate it.
- name: up to 128 characters long, required.

##### Posts

- id: number, no need to provide it when creating posts, the database will automatically generate it.
- userId: number, required, must be the id of an existing user.
- text: string, no size limit, required.

We have provided test data for the resources.

Now that we have a way to add, update, remove and retrieve data from the provided database, it is time to work on the API.

### Implementation Requirements

- Take the steps necessary to create a `package.json` to keep a record of our dependencies.
- use _yarn_ or _npm_ to add **knex** and **sqlite3** as dependencies to the project. **This is required for database access**.
- Configure an _npm script_ named _"start"_ that will execute your code using _nodemon_ so that the server restarts on changes. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
- Design and build the necessary endpoints to:
  - perform CRUD operations on _users_ and _posts_.
  - retrieve the list of posts for a user.
- **Use _Postman_ to test the API as you work through the exercises.**



## Stretch Goal

- Use `create-react-app` to create an application inside the root folder, name it `client`.
- From the React application connect to the `/api/users` endpoint in the API and show the list of users.
- Add functionality to show the details of a user, including their posts, when clicking a user name in the list. Use React Router to navigate to a `/users/:id` route to show the user details.
- Add styling!
