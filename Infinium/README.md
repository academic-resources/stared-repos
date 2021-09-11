![Logo of the project](./public/images/infinium-logo.JPG)

# Infinium

**Welcome to Infinium!**

A website created so that the ordinary human can escape from their own reality and enter a world of science fiction and fantasy. Browse endlessly through the countless tales of magic and wonder or create your own world with the story creation tools available. Follow your friends and interact with their recounts of heroism and adventure by liking and commenting.

You can read stories, view likes, comments, and number of followers, all without need of logging in.

But better yet, you can register as a user (no worries about your email being used, its just for log-in on this site). As a logged-in user, you will have access to:

* Story creation (setting a title and body text, saving in a draft till ready to publish, adding an optional subtitle and image upon publication, and deleting either before or after publication, along with returning to draft status after publishing for edits)
* Following others (and being Followed)
* Commenting on stories as much as you would like (editing and deleting those)
* Giving lightsabers (likes) on stories, up to 50 per story

(DISCLAIMER: In reality, this site is an App Academy project that is a quick "clone" of the Medium website's look and feel as well as some of the functionality. The "information" on this site is primarily pure gibberish. The purpose of this was to get experience programming a full stack app for the first time, back to front.)

## Features

### Stories

Stories provided some interesting challenges in order to:

* Use a hexadecimal id for the stories (Medium does this)

    To implement this, all routes involving stories had to have incoming URLs parsed from hexadecimal to decimal for database lookup, then back again for any use in pug templates for `href` functionality. The solution was simply a couple of helper functions in `utils.js`:

    ```js
    const setHexadecimal = number => number.toString(16);

    const parseHexadecimal = hexString => parseInt(hexString, 16);
    ```

    However, remembering to do that at times (and do it correctly or at the correct place) were the source of some bugs in the earlier part of the week.

* Provide more consistent data to the front end. For this, more helper functions were setup, a primary one being the preprocess to get the details for sending to the pug, while keeping unneeded `User` data from going to the front end:

    ```js
    const preProcessStories = (stories, username) => {
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
        const processed = stories.map(story => {
            story = story.toJSON();
            story.hexId = story.id ? setHexadecimal(story.id) : null;
            story.author = username || story.User.username;
            story.authorId = story.User? story.User.id : null;
            story.date = story.updatedAt ? story.updatedAt.toLocaleDateString("en-US", dateOptions) : null;
            delete story.User;
            return story;
        });
        return processed;
    };
    ```
    Then this, along with some other helper functions, streamlined what was in the routers (e.g.):

    ```js
    let story = await Story.findOne({
        where: isDraft(userId, storyId),
        include: getAuthor(),
    });

    //Some other code often put here

    const details = prepareStoryEditorDetails(req, story);

    res.render('story-edit', { ...details });
    ```

* Allowing for multiple revisions in a draft state before publication required backend and frontend work.

    The database had two fields `draft` and `published`; one was always `null`. This was chosen for expansion purposes, as eventually the idea was to allow for "editing" of a published story while that story was still visible to users (currently that is not the case, if a published story enters back into editing, it moves the story from `published` to `draft` and is no longer viewable).

    An interesting aspect of the functionality was, just as Medium does, first directing users to a `/new-story` page, where nothing is yet created in the database until the first "save" is pressed (though Medium does autosave, which is a feature we would like to eventually add). Then all routing takes place as a combination of the user's (author's) id and the story's id: `users/<id>/stories/<hexId>`. This is a way of mimicking the fact that Medium requires authors to have a unique "publication" route that is then followed by the story title and id. In our case, the `users/<id>` functions in place of the "publication" and we just used a RESTful route throughout for the story as well.

### Comments

* Access and leave comments on any story
* Comments dynamically update on your page after you publish, edit or delete them
* Comments slide into the screen and slide out

Comments functionality on the front-end were created with the use of the Fetch API to provide real-time site updates without the need for a page refresh.

Example: Dynamically editing a comment with Fetch

```js
const body = { comment };
try {
    const res = await fetch(`/stories/${storiesId}/comments/${commentId}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw res;
    }
} catch (err) {
    alert("Something went wrong. Please try again!");
}
```
PostgreSQL utilization for database storage of all comments, available for any Fetch method request.

Example: Back-end routing established for accessing and deleting a comment from the database.

```js
router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const comment = await Comment.findByPk(id);

    if (comment) {
        await comment.destroy();
        res.status(204).end();
    } else {
        const errors = validateErrors.array().map(error => error.msg);
        res.render('comments', {
            errors,
        });
    }
}));
```
There were some unique challenges with the comments, causing three of us to spend considerable time in various capacities on them. A number of insidious bugs were present in that last few days before deployment. Two big ones were the update of a comment `fetch` for a `PUT` (shown above) request was not *just* doing that, but also initiating *something* after one of the pushes suddenly causing a `GET` to immediately follow with an attached query string of what the newly revised comment was. It turned out that a key placement of `event.preventDefault()` was needed to fix that.

There was also some bug that was a combo: after *updating* the comment and/or *canceling* a delete, going through with a delete was causing "extra" deletions from the "Responses" count based on the number of times buttons were hit. This turned out to finally be solved (1) by unnesting some of the `addEventListener()` calls and (2) making those calls named functions and explicitly calling `removeEventListener()` on them when they were no longer needed.

## Local Installation

Guidelines to run the app locally for development and testing purposes.

### Installation Prerequisites

For local installation you need Git, node.js (and its package manager that comes with it, npm) and a PostgreSQL database.

### Installation Instructions

1. Clone the repository:

    ```
    $ git clone https://github.com/scottgit/Infinium.git
    ```
2. Create a postgres user infinium_app with CREATEDB privileges
3. Create a .env file at the root of this project, add environment variables provided in .env.example to .env file (make sure the database password is set correctly and you create a SESSION_SECRET)
4. At the root of the repository, install the dependencies

    ```
    $ npm install
    ```
5. Still at the root, run the sequelize commands to create the database, migrate models, and seed the database:

    ```
    $ npx dotenv sequelize db:create
    $ npx dotenv sequelize db:migrate
    $ npx dotenv sequelize db:seed:all
    ```

### Running the App

Still at the root, run the app with:

```
$ npm start
```
Then open a browser and navigate to `localhost:8080`

## Technologies Used

A list of some primary technologies used for Infinium are:

- Node.js
- Express.js
- Sequelize
- Pug templates

## FAQ

### How can I write a story or leave a comment?

You will first need to sign-up for an account. Once you are logged in, you will have access to all features on the website, which include writing a story or leaving a comment.

### How can I follow my favorite writers?

See a story you like? You can click on the follow link at the top of any story page to begin following that writer.

### Why lightsabers?

Because they are cool.

## Links

Your destiny awaits... follow this link to enter Infinium:

https://infinium.herokuapp.com/

## Contributing

* Dale Sakamoto - [DaleTsakamoto @ GitHub](https://daletsakamoto.github.io/)
* Michael Jensen - [Mjensen24 @ GitHub](https://github.com/Mjensen24)
* Rhys Previte - [Preezey24 @ GitHub](https://github.com/Preezey24)
* Scott Smith - [scottgit @ GitHub](https://github.com/scottgit)
