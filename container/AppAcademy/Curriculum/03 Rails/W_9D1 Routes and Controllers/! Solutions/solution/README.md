# Art Share API

We're going to continue building on the API we built in the first
routes project. Our goal is to build an application to store, share, and
comment on artwork, as well as search for users.

Each user has a set of artworks that they own/control. These artworks
can also be shared with other users. An artwork that has been shared
with one or more other users will be visible to those users, but the
artwork still 'belongs to' the original user.

Although we will maintain this conceptual distinction between a user's
own artworks vs. the artworks that have been shared with that user, we
will eventually write an index method that will combine both types of a
user's viewable artworks together so that we can see any art made by or
shared with that user.

## Learning Goals

* Be able to write Active Record models quickly
* Know how to write a `user_params` method
* Be able to write the five API RESTful controller methods
* Know how to test your API endpoints with Postman
* Know how to create and destroy join table records via controller
methods
* Know how a nested route works

## Phase I: Data Layer

### Overview

You almost always start with the data layer when you're thinking about
adding functionality. Questions to consider include the following: What
pieces of data are necessary to implement the functionality you need?
What changes need to be made to the database schema? What models do you
need? What associations and validations?

In this first phase we're going to add the tables for users, artworks,
and artwork shares. We are also going to write validations and
associations linking them.

### Instructions

#### User

For the `user` table you should have `name` and `email` columns from the
first routes project. Change your User model so that you only have one
column: `username`. Write new migrations to accomplish this. Enforce
presence and uniqueness of `username` at both ActiveRecord and DB
levels.

After you create each table and model, make sure to test that your
associations and validations are working before moving on to the next
step. We want to be ***absolutely sure*** our code is working before we
move on to the next phase, otherwise building our API endpoints will be
needlessly complicated.

#### Artwork

For your `artworks` table you should have the following columns:
`title`, `image_url`, and `artist_id`. All of these should be present.
Add ActiveRecord validations and DB constraints.

Ensure a single user cannot have two artworks with the same title. On
the other hand, two different users can have artworks with the same
title. In other words, two separate artists could both have artworks of
their own named "Untitled", but a single artist should not be able to
have two pieces with that same title.

This means that the `artist_id` and `title` **combination** must be
unique. Enforce this at the DB and model levels. [Here's some help for
the model validation][scoped-uniqueness] To add the DB constraint,
consider what would happen if we added indexing and a uniqueness
constraint to not one, but two columns. [Check this Stack Overflow answer for
more info][multi-column-indexing]

Add an index on `artist_id` so that we can quickly get all the artworks
for a user. Also add associations between `User` and `Artwork`. The
association from `Artwork` to `User` should be called `artist`. Note
that our column in the `artworks` table does not have to be `user_id`
despite being a foreign key to the `users` table. In this case,
`artist_id` is much more descriptive and therefore preferable.

[scoped-uniqueness]: http://guides.rubyonrails.org/active_record_validations.html#uniqueness
[multi-column-indexing]: http://stackoverflow.com/questions/6169996/index-on-multiple-columns-in-ror

#### ArtworkShare

The `artwork_shares` table is a join table. Its whole purpose is to link
a `User` (the person viewing the artwork) with an `Artwork`.

You'll need an `artwork_id` and `viewer_id` column. Again, prefer
columns names that are more semantic (i.e. more descriptive of the
relationship) when possible.

Ensure that both are present. Add the two levels of
validations/constraints. Ensure that a user cannot have a single
`Artwork` shared with them more than once. Also add indices to
`ArtworkShare`'s foreign key columns for fast lookup. NB: we almost
always want to create indexes for any foreign keys, particularly if
those foreign keys will be used in a `has_many` or a `has_one`
relationship.

Then add associations connecting an `ArtworkShare` to both an `Artwork`
and a `User` (name this association `viewer`). Add a through association
`shared_viewers` on `Artwork`. `Artwork#shared_viewers` will return the
set of users with whom an artwork has been shared.

Add a `through` association from `shared_artworks` on `User`.
`User#shared_artworks` will return the set of artworks that have been
shared with that user (*not* the set of artworks that a user has shared
with others).

### Recap

You should now have tables and models for `User`, `Artwork`, and
`ArtworkShare`, as well as the relevent validations and associations.

If you haven't already, now might be the time to seed your `seeds.rb`
file seed data. This is easier than creating seed data in the Rails
console and should you ever drop your database will provide an easy way
to re-populate your tables with testable data.

## Phase II: Users and Artworks API

### Overview

Next let's move to the API layer. The API describes how you will
**expose** your data and specifies how the outside world can interact
with it. Today we'll be using the Postman web app to test our API
endpoints. When debugging make sure to reference your Rails server log.
It will provide you will valuable insight as to what's going wrong.

### Instructions

First, make sure the `User` controller actions you created in the
previous project are all working. They should do the following:

* `user_params` helper method

This method should be private. It requires the key `:user` in params,
and permits each of the user attributes as keys in the nested hash.

* `create` (POST `/users`)

Remember to use `if user.save` to check if validations passed. On
error, this action should render validation errors using
`user.errors.full_messages`. Set the status code to indicate error.

* `destroy` (DELETE `/users/:id`)

Finds the user (we can lookup the id in `params[:id]`) and destroys the
object (using the [destroy](http://guides.rubyonrails.org/active_record_basics.html#delete) method on the user instance).
Best practice is to render the destroyed user after destroying
it in the database.
Use `dependent: :destroy` in the `artworks` and
`artwork_shares` associations on `User`.
This ensures that the associated records are also destroyed.

**N.B.** There is another ActiveRecord method that removes objects from your database, `delete`; however, this method does not run callbacks such as `dependent: :destroy`, and is therefore not the method we want to use.

* `index` (GET `/users`)

Renders all the users in the database.

* `show` (GET `/users/:id`)

Renders a single user, using the `:id` in `params[:id]`.

* `update` (PATCH `/users/:id`)

Finds the requested user. Use `update` with `user_params` to do a
mass-assignment update and save. Render validation errors using
`user.errors.full_messages`.  *Don't forget the status code!*

Now let's move to the `routes.rb` file. You should already have routes
for the `users` controller from the previous project. Use the `only:`
option for `resources` to restrict to just the five actions above for
the `users` controller. There should be six routes in total; remember
that Rails will generate both `patch` and `put` routes for the `update`
action.

Next, move on to creating `ArtworksController`. Build the same five
actions and params helper method. Your code should look very similar,
but practice this a second time.

**Hint**: For this project, do not write any authentication or
authorization logic. When creating a new `artwork`, require the
uploader submit their `artist_id`. This isn't secure because anyone
could always take your `artist_id` and upload new artworks in your name.
For now, let's assume the users of our service aren't malicious
:-)

### Recap

Congratulations! You should now have tables, models, and controllers for
users and artworks. Before moving on, test that your API endpoints are
working with Postman. Then call over a TA and explain your code.

## Phase III: Sharing `Artworks`

### Overview

Now we're going to add routes and controllers for our `ArtworkShares`.
The `artwork_shares` table is a join table, so while RESTful design
patterns still apply, our `ArtworkShares` controller will look a little
different from the controllers we just wrote. All we need to be able to
do is share and unshare artworks. What controller actions do you think
we'll need?

Once we have sharing working, we'll refactor `ArtworksController#index`
so that it returns artworks either belonging to or shared with a
particular user. In order to make this work we'll need to pass in the
`user_id` to our `index` action so we can filter for the appropriate
works.

### Instructions

Add a new `resources` routes and controller for `ArtworkShare`.
Include the following actions and associated routes.

* `create` (POST `/artwork_shares`)

You'll want to pass the `artwork_id` and the `viewer_id`.
Also, use strong parameters by writing an `artwork_share_params` helper
method that will whitelist the `ArtworkShare` attributes.

* `destroy` (DELETE `/artwork_share/:id`)

This un-shares an `Artwork` with a `User`. To delete a share, the user
should issue a DELETE to `/artwork_shares/123`, where `123` is the id of
the `ArtworkShare` to destroy.

After we create ArtworkShare records, we will want to return the record
to the client. We will want to do the same thing upon deletion of
ArtworkShare records. Both of these routes should conventionally render
the created/destroyed `ArtworkShare` as the response.

We won't need any of the other routes, so you can use `only:` to
restrict them.

Use Postman to make sure that your controller's `create` and `destroy`
actions work properly. Remember, our validations should prevent us from
sharing the same `artwork` with the same `user` more than once.

#### User's Artworks: nested routes

We want to be able to fetch the `Artwork`s of a particular user.
However, right now a GET to `/artworks` gets all of the artworks in the
system.

Let's add a new, nested resource, `/users/:user_id/artworks`, so that
we can get the artworks for a given user. We'll only need the `index`
action for this.

You may remove the `index` action from the top-level `artworks`
resource. This will modify our API so that a user can't download all the
artworks in one go, but instead only per-user. For example, you will
be able to get user 1's artworks through `GET /users/1/artworks`, user
2's through `GET /users/2/artworks`, etc.

The nested resource will still hit `ArtworksController#index`. Rewrite
the `index` method to return:

*  the `Artwork`s owned by a user ***and***
*  the `Artwork`s shared with the user.

You can access the specified user through `params[:user_id]` because it
is part of the nested route.

Use Postman to make sure your modified `index` method in the
`ArtworksController` returns all art owned by and shared with a user.

### Recap

At this point in the project you should be able to create
`ArtworkShares` with  Postman. Artworks shared with a particular user
should also be included in data returned by a `GET` request to
`ArtworksController#index`.

## Phase IV: Comments

### Overview

Now it's time to add commenting functionality to our application so our
users can comment on a piece of artwork. By the time we're done, we want
to be able to retrieve both a specific user's comments as well as
comments left on a specific artwork. To do with we'll have our
`CommentsController#index` method return commments based on the params
provided by our request.

### Instructions

First create a comments table that has a foreign key for both user and
artwork. We'll also want a `body` column that contains the text of the
comment. On what columns should we add an index?

Our users and artworks will both `have_many` comments. A comment should
`belong_to` a author (the user who left that comment) and artwork. Write
these associations now. Remember to include `dependent: :destroy` when
necessary. For instance, when an artwork or user is removed from the
database, we don't want their associated comments to persist.

Before moving on test that these associations work.

Once we know our table and model have been set up correctly, it's time
to make our controller. The `CommentsController` should have `create`,
`destroy`, and `index` actions.

In order to retrieve comments for an artwork or a user we want our
`index` action to handle some additional params. In particular, we want
to be able to pass in a `user_id` or a `artwork_id`. By checking if
either is present we can then retrieve the comments just for that user
or artwork. Update your `comment_params` accordingly.

### Recap

It should now be possible to make `GET` requests to
`CommentsController#index` and depending on the params provided either
return comments made by a particular user or comments made on a
particular piece of artwork.

## Phase V: Search

### Overview

Now let's add search functionality to our application so users can
search for other users by name. To do this we won't need to change any
routes. We can just edit the `index` action in our `User` controller.

In `UsersController#index` check if a `query` is present in the request
params. If it is, use that query to filter the users returned by the
`index` action. If there is no query, just return all users as usual.

Discuss with your partner the best way to write your query method.
Here's a [good place to start][postgres-search].

## Bonus Phase I: Likes

In this phase we'll implement likes using polymorphic associations.
Users should be able to like both comments and artworks. Read these
[Rails docs][polymorphic-associations] on polymorphic associations to
get started.

Then discuss with your partner how you plan to approach this feature.
We'd like to be able to call associations on a user and return their
liked comments and artworks. We also want to be able to call an
association on comments and artworks to get the users who have liked
them.

## Bonus Phase II: Favorite Artworks

Let's also allow users to favorite artworks. This will require
additional columns to artworks (for favoriting of artworks by their
owner) and shared artworks (for favoriting of artworks shared to a
user). Use a semantic custom route to accomplish this.
[Hint.][more-restful-actions]

## Bonus Phase III: Artwork Collections

And finally, users should be able to add artworks to artwork
collections. Allow each user to have many collections. Artworks can also
belong to more than one collection. What sort of table will you need to
make this work?

[poly-assoc]: http://guides.rubyonrails.org/association_basics.html#polymorphic-associations
[concerns-for-models]: http://signalvnoise.com/posts/3372-put-chubby-models-on-a-diet-with-concerns
[postgres-search]: https://www.postgresql.org/docs/8.3/static/functions-matching.html
[polymorphic-associations]: http://guides.rubyonrails.org/association_basics.html#polymorphic-associations
[more-restful-actions]: http://guides.rubyonrails.org/v3.2.14/routing.html#adding-more-restful-actions
