# LS-Mongo-I

## Topics

* Databases
* Relational Databases
* Non-Relational Databases
* MongoDB
* Mongoose
* ORM
* `mongod`
* Mongoose.connect
* Mongoose.Schema
* Mongoose.model
* module.exports
* Model.find
* Model.findById
* Model.find().remove()
* .save
* Error first callback
* \_id

## Assignment

Download MongoDB.  https://www.mongodb.com/download-center
Create a new folder and run `npm init` to create your `package.json` file.
Install npm packages: `npm i --save express body-parser cors mongoose`
Start your MongoDB server by running `mongod` from the command line.
Implement the following routes but have them utilize a database to achieve data persistence.
* [POST] `/users` This route should save a new user to the server.
* [GET] `/users` This route will return an array of all users.
* [GET] `/users/:id` This route will return the user with the matching `id` (`_id` on the db document) property.
* [DELETE] `/users/:id` This route should delete the specified user.

## Extra Credit

Implement a second collection called `BlogPosts`.  Implement the following routes:
* [POST] `/posts` This route should save a new blog post to the server.
* [GET] `/posts` This route will return an array of all blog posts.
* [GET] `/posts/:id` This route will return the blog post with the matching `id` property.
* [DELETE] `/posts/:id` This route should delete the specified blog post.
Your user objects can take any form.
