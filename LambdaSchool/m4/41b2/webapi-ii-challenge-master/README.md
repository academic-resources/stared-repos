# Building RESTful APIs with Express

## Topics

- Express Routing
- Reading Request data from body and URL parameters
- Sub-routes
- API design and development.

## Description

Use `Node.js` and `Express` to build an API that performs _CRUD_ operations on `blog posts`.

### Project Setup

- **Fork** and **Clone** this repository.
- **CD into the folder** where you cloned the repository.
- Type `npm install` to download all dependencies.
- To start the server, type `npm run server` from the root folder (where the _package.json_ file is). The server is configured to restart automatically as you make changes.

### Database Persistence Helpers

The `data` folder contains a database populated with test `posts`.

Database access will be done using the `db.js` file included inside the `data` folder.

The `db.js` publishes the following methods:

- `find()`: calling find returns a promise that resolves to an array of all the `posts` contained in the database.
- `findById()`: this method expects an `id` as it's only parameter and returns the post corresponding to the `id` provided or an empty array if no post with that `id` is found.
- `insert()`: calling insert passing it a `post` object will add it to the database and return an object with the `id` of the inserted post. The object looks like this: `{ id: 123 }`.
- `update()`: accepts two arguments, the first is the `id` of the post to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
- `remove()`: the remove method accepts an `id` as its first parameter and upon successfully deleting the post from the database it returns the number of records deleted.
- `findPostComments()`: the findPostComments accepts a `postId` as its first parameter and returns all comments on the post associated with the post id.
- `findCommentById()`: accepts an `id` and returns the comment associated with that id.
- `insertComment()`: calling insertComment while passing it a `comment` object will add it to the database and return an object with the `id` of the inserted comment. The object looks like this: `{ id: 123 }`. This method will throw an error if the `post_id` field in the `comment` object does not match a valid post id in the database.

Now that we have a way to add, update, remove and retrieve data from the provided database, it is time to work on the API.

### Blog Post Schema

A Blog Post in the database has the following structure:

```js
{
  title: "The post title", // String, required
  contents: "The post contents", // String, required
  created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}
```

### Comment Schema

A Comment in the database has the following structure:

```js
{
  text: "The text of the comment", // String, required
  post_id: "The id of the associated post", // Integer, required, must match the id of a post entry in the database
  created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}
```

### Minimum Viable Product

- Add the code necessary to implement the endpoints listed below.
- Separate the endpoints that begin with `/api/posts` into a separate `Express Router`.

### Endpoints

Configure the API to handle to the following routes:

| Method | Endpoint                | Description                                                                                                                                                                 |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/posts              | Creates a post using the information sent inside the `request body`.                                                                                                        |
| POST   | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`.                                                                   |
| GET    | /api/posts              | Returns an array of all the post objects contained in the database.                                                                                                         |
| GET    | /api/posts/:id          | Returns the post object with the specified id.                                                                                                                              |
| GET    | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.                                                                                 |
| DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement. |
| PUT    | /api/posts/:id          | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.                                           |

#### Endpoint Specifications

When the client makes a `POST` request to `/api/posts`:

- If the request body is missing the `title` or `contents` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

- If the information about the _post_ is valid:

  - save the new _post_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _post_.

- If there's an error while saving the _post_:
  - cancel the request.
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.

When the client makes a `POST` request to `/api/posts/:id/comments`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If the request body is missing the `text` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide text for the comment." }`.

- If the information about the _comment_ is valid:

  - save the new _comment_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _comment_.

- If there's an error while saving the _comment_:
  - cancel the request.
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ error: "There was an error while saving the comment to the database" }`.

When the client makes a `GET` request to `/api/posts`:

- If there's an error in retrieving the _posts_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The posts information could not be retrieved." }`.

When the client makes a `GET` request to `/api/posts/:id`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If there's an error in retrieving the _post_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The post information could not be retrieved." }`.

When the client makes a `GET` request to `/api/posts/:id/comments`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If there's an error in retrieving the _comments_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The comments information could not be retrieved." }`.

When the client makes a `DELETE` request to `/api/posts/:id`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If there's an error in removing the _post_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The post could not be removed" }`.

When the client makes a `PUT` request to `/api/posts/:id`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If the request body is missing the `title` or `contents` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

- If there's an error when updating the _post_:

  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The post information could not be modified." }`.

- If the post is found and the new information is valid:

  - update the post document in the database using the new information sent in the `request body`.
  - return HTTP status code `200` (OK).
  - return the newly updated _post_.

## Stretch Problems

To work on the stretch problems you'll need to enable the `cors` middleware. Follow these steps:

- add the `cors` npm module: `npm i cors`.
- add `server.use(cors())` after `server.use(express.json())`.

Create a new React application and connect it to your server:

- Use `create-react-app` to create an application inside the root folder, name it `client`.
- From the React application connect to the `/api/posts` endpoint in the API and show the list of posts.
- Style the list of posts however you see fit.
