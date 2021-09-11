# Express and Node.js Sprint Challenge

## Assignments

- Please open the `Review.md` file and answer the questions.
- Use Node.js and Express to design and build an API that performs CRUD operations on **projects** and **actions**.

### Download Project Files and Install Dependencies

- **Fork** and **Clone** this repository.
- **CD into the folder** where you cloned the repository.
- Code!

### Implement Requirements

- Take the steps necessary to create a `package.json` to keep a record of all dependencies.
- use _yarn_ or _npm_ to add **knex** and **sqlite3** as dependencies to the project. **This is required for database access**.
- Configure an _npm script_ named _"start"_ that will execute your code using _nodemon_ so that the **server restarts on changes**. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
- Design and build a set of endpoints that satisfy the API requirements.
- **Use _Postman_ to test the API as you work through the exercises.**

### Database Persistence Helpers

The `/data/helpers` folder includes helper files that you can use to manage the persistence of _project_ and _action_ data. These files are `projectModel.js` and `actionModel.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

- `get()`: calling get returns an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.

**All these helper methods return a promise.**

#### Database Schemas

The _schemas_ (properties and data type of each property) used to store and retrieve the resources inside the included database (`lambda.sqlite3`) is described below.

##### Projects

- `id`: number, no need to provide it when creating projects, the database will generate it.
- `name`: string, up to 128 characters long, required.
- `description`: string, no size limit, required.
- `completed`: boolean to indicate if the project has been completed, not required

##### Actions

- `id`: number, no need to provide it when creating posts, the database will automatically generate it.
- `project_id`: number, required, must be the id of an existing project.
- `description`: string, up to 128 characters long, required.
- `notes`: string, no size limit, required. Used to record additional notes or requirements to complete the action.
- `completed`: boolean to indicate if the action has been completed, not required

We have provided test data for all the resources.

Now that we have a way to add, update, remove and retrieve data from the provided database, it's time to work on the API.

### Design and Build Endpoints

Design and build the necessary endpoints to:

- perform CRUD operations on _projects_ and _actions_.
- retrieve the list of actions for a project.

## Stretch Goal

- Use `create-react-app` to create an application in a separate folder (outside the API project folder). Name it anything you want.
- From the React application show a list of all _projects_ using the API you built.
- Add functionality to show the details of a project, including its actions, when clicking a project name in the list. Use React Router to navigate to a separate route to show the project details.
- Add styling! Perhaps with [`styled-components`](https://www.styled-components.com/).
