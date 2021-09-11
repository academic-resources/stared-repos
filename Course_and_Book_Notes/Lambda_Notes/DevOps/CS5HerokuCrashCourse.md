#### Heroku

- Takes your code and runs it in a specific environemnt and gives you back a URL to make it work
- Five free applications hosted

## [Heroku Tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

#### Assumptions:

- Free Heroku account
- At least NPM and Node installed locally
- Credentials (login) for Heroku website and your command line for Heroku have to be the same

###### Heroku takes your package.json and exposes that to the internet

- Downloads all your dependencies, bundles it together, takes your server.js (or wherever you're calling server.listen), executes that line, takes your npm start command and does what it needs to do with it.
- Can deploy an entire application on Heroku

#### Two different tools:

- **ngrok**: made for simple testing and forwarding port to WWW. Your site is unaccessible when your server is down.
- **heroku**: taking your files and storing them in their git remote. They're creating a remote and storing it on their server. Takes your package.json and npm installs all the dependencies your app needs and serves it up to the WWW. Your site is deployed until you remove it.

#### Steps:

- Set up Heroku account
- Download command line interface into your app
  - Piggyback off of git
  - Push to it instead of github
  - `git push heroku master` is the command you will use
- once you have a git init, you can keep your files on github and deploy to heroku

When you have active changes:

- git add
- git commit
- git push
  - can push to github and then push to heroku
    - once it reaches heroku server, it will deploy to WWW

App Ryan deployed:

```
const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')
const port = process.env.PORT || 3030;
const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json())

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
    const contents = fs.readFilesSync('words.txt', 'ut8');
    return contents.split('\n')
};

const words = readWords()
const index = Math.floor(Math.random() * words.length);

const wor = words[index];
const guesses = {}

server.get('/', (req, res) => {
    const wordsSoFar = word
    .split('')
    .map(letter => {
        if (guesses[letter]) {
            return letter;
        }
        return '-';
    })
    .join('');

    res.json({ wordsSoFar, guesses });
});

server.post('/guess', (req, res) => {
    const letter = req.body.letter;

    if (!letter) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a letter' });
        return;
    }
    if (letter.length !== 1) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must guess a single letter' });
        return;
    }
    if (guesses[letter]) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: `You've already guessed ${letter}!` });
        return;
    }

    guesses(letter) = true;
    res.json({ guesses });
})

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`Magic happening on ${port}`);
});
```

In this step, you will deploy the app to Heroku:
`heroku create`

- When you create an app, a git remote is also created and associated with your local git repository

`heroku create node-hangman-lambda`

- Two different urls to fetch and push to (one for github and one for heroku)

Question:

- Is there a deployment feature to let us view the app we create from different browsers and devices?
  - Don't know

Heroku gives you a URL you can use for your application

```
- git add .
- git status
- git commit -m "made the h1 say foobar"
- git push heroku master
```

As you're committing, you're deploying. Can redeploy as soon as you commit.

If you look at your app:

- Click More
  - Application logs
    - Info about what broke
    - Can look up errors
  - Heroku has a cheatsheet for looking up errors

If you pay for their upgraded tiers, you can use it as a hosting service with custom URLS.

In the free tier, it makes your app go to sleep after a while of inactivity.
