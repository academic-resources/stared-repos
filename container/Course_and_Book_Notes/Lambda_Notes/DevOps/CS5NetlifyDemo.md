### Front-end engineering:

- Putting together a bunch of components, a bunch of files, and building an application
  - You could make a very amazing career out of just doing that.

### Back-end engineering:

- Let's build a server that some sort of front-end or other back-end could interface
  - And then let's figure out how to transfer data between those two and then store that data somewhere for our use later or so we can hold it in memory and update/delete, etc.

User experience design is a huge industry in and of itself.

Putting your application on the web is a small part of what a DevOps engineer would do.

### In olden times:

- Team of engineers who build it to a point where it looked and worked good on their local machines and then hand it over to ...
- Sysadmin or IT department who would take it to the other side of the wall and deploy it in some instance or get it onto the world wide web and distribute it to the end user
- Those two used to be very separate.

#### Recently:

### DevOps engineer:

A person who can sort of dip into both ends of those two separate tasks.

- Could be potentially someone really good at sysadmin

### Sysadmin:

- Someone you go to when anything breaks down
  - Hardware, you can't log into your email, etc.
  - Deal with a lot of issues that helps us run our day to day lives
  - When someone onboards, the sysadmin is usually the person who's available to set them up in the system
    - Work hand in hand with multiple departments
- Someone who can really work with servers
  - SSH into a terminal
  - Log into a server
- Diagnose problems
- Tends to be the type of person who's up at night waiting for things to go wrong

### DevOps:

- Middleground person
- Somebody who can be good in a lot of ways
- Able to take code and put it live on the internet and distribute across multiple platforms and systems and ensure that it works
  - When something goes down, first line of defense
- Absolutely valuable to a company and companies pay really well for DevOps engineers

### [Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)

- Takes your git package and puts it on the world wide web for you

```
create-react-app netlify-demo

cd netlify-demo

yarn
```

[Swapi Api](https://swapi.co/api/people/)

#### App.js:

```
import React, { Component } from 'react';
import './App.css';

import StarWarsList from './StarWarsList';

class App extends Component {
    render() {
        return (
            <div classname="App>
                <header className="App-header">
                    <h1 className="App-title"> Ryan's Star Wars Project</h1>
                </header>
                <StarWarsList />
            </div>
        );
    }
}

export default App;
```

Fetch API - not available in Node (have to use a package in Node if you want to use it)

#### StarWarsList.js:

```
import Read, { Component } from 'react';

class StarwarsList extends Component {
    constructor() {
        super();
        this.state = {
            starWarsChars: []
        }
    }
    componentDidMount() {
        fetch('https://swapi.co/api/people')
            .then(res => {
                return res.json();
            })
            .then(chars => {
                const starWarsChars = chars.results;
                this.setState({
                    starWarsChars: starWarsChars
                })
            })
            .catch(err => {
                console.log(err)
            });
    }
    render() {
        return (
            <ul>
                {this.state.starWarsChars.map(char => {
                    return <li key={char.url}>{char.name}</li><div> THIS IS OUR LIST </div>
                })}
            </ul>
        )
    }
}

export default StarWarsList;
```

#### App.css

```
.App {
    tex-align: center;
}
.App-header {
    background-color: #e3e3;
    height: 150px;
    padding: 20px;
    color: white
}
.App-title {
    font-size: 2em;
}
.App-intro {
    font-size: large;
}

li {
    list-style: none
}
```

First, need to publish on git.

- You want your code in a version control system

```
git init
git add .
git commit -m 'initialized home layout'
git remote add origin https://github.com/ryanhca/netlify-sw.git
git push -u origin master
```

With create-react-app, everything's built in for you. Only a few tweaks you need to do to get your code available to the world wide web

- New site from git
  - GitHub, GitLab, BitBucket
  - Authorization
  - Find repo

"If you are using a static site generator or build tool, we'll need these settings to build your site"

If you run the build command in the application, it will generate a build directory for you.

- npm run build
- publish directory
  - /build
- click deploy

### Webpack

- create-react-app sort of hinders you in the sense that you don't get to dig into webpack until you eject from it.
- **webpack** is a tool that takes all of your code, bundles it up and spits it out into a single bundle file.
  - That's one way you can use webpack. - It's running Babel over it and everything like that.
- That's what webpack is doing for you under the hood and when you abstract it away with create-react-app, when you run this build, it will do that process for you and spit it out into some sort of build directory

### Netlify:

The URL netlify generates is an adoring-neumann URL

Deploy log - the screen you're looking for to see what's going write or wrong

Build is doing "react-scripts build"

Continuous Build Feature

- Build & deploy
  - Continuous Deployment

### Continuous Deployment:

(From Netlify Docs:)

- For anything larger than a one page landing, you really should be using a static site generator or a front-end build like grunt or gulp
  - that's where we use webpack
- Lets you link up a GitHub repo to a site. Each time you push to GitHub, Netlify runs a build with your tool of choice and deploys the result to our powerful CDN

If you're working on another branch, it will only update if merged to master

Someone posted in slack at the end saying:

```
FYI If you use <BrowserRouter> you have to have a file in your public folder called _redirects with /* /index .... will not work
```

Think the full statement might have been (based on [this documentation](https://www.netlify.com/docs/redirects/)):

> FYI If you use <BrowserRouter> you have to have a file in your public folder called \_redirects with `/* /index.html 200` or it will not work
