**Setup**
- Create a main folder for our app to be in
- create a backend folder and frontend folder
- npm init and git init (both)
- npm nstall sequelize, sequelize-cli --save-dev, pg, express, pug, nodemon --save-dev, dotenv, dotenv-cli --save-dev, cookie-parser, csurf, bcryptsjs, express-validator, per-env, cors, jsonwebtoken, express-bearer-token (both)
- Create user in postgres with createdb and password (BE)
- Create database with owner (BE)
- Create a ".sequelizerc" file and edit it (BE)
    ```js
    const path = require('path');
    module.exports = {
        'config': path.resolve('config', 'database.js'),
        'modules-path': path.resolve('db', 'models'),
        'seeders-path': path.resolve('db', 'seeders'),
        'migrations-path': path.resolve('db', 'migrations'),
    };
    ```
- Initialize sequelize and edit config file (BE)
- Create a .env file and edit (BE)
    ```text
    PORT=8080
    PORT2=4000
    DB_USERNAME=
    DB_PASSWORD=
    DB_DATABASE=
    DB_HOST=localhost
    JWT_SECRET=
    JWT_EXPIRES_IN=
    ```
- Create an "index.js" in the config folder and edit it (BE)
    ```js
    module.exports = {
        environment: process.env.NODE_ENV || "development",
        port: process.env.PORT || 8080,
        port2: process.env.PORT2 || 4000,
        db: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOST,
        },
        jwtConfig: {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    };
    ```
- Edit "database.js" file inside of the config folder (BE)
    ```js
    const config = require("./index");

    const db = config.db;
    const username = db.username;
    const password = db.password;
    const database = db.database;
    const host = db.host;

    module.exports = {
    development: {
        username,
        password,
        database,
        host,
        dialect: "postgres",
    },
    };
    ```
- Create a "bin" folder in the root project folder 
- Create a file named "www" in "bin" folder and edit it. This is creating and entry point for our application
    ```js
    #!/usr/bin/env node

    const appFront = require('../frontEnd/index');
    const appBack = require('../backEnd/app');
    const { port, port2 } = require('../config');

    app.listen(port, () => console.log(`Listening on port ${port} and ${port2}...`));
    ```
- Edit "start" script in package.json
    ```js
    "start": "nodemon -r dotenv/config ./bin/www"
    ```
- Create model tables
- Edit migrations and model files and migrate them
- Create seeder files and seed them
- Create an "index.js" file in the frontend folder and a "app.js" file in the backend folder
- Create a ".gitignore" file in both frontend and backend folders.
- Do all require's and use's in both index.js and app.js
    ```js
    //Template for requires
    // In app.js
    const express = require("express");
    const morgan = require("morgan");
    const { environment } = require('./config');
    const app = express();
    const { asyncHandler } = require('./utils');
    const cors = require('cors');
    const indexRouter = require('./routes/index');
    const articlesRouter = require('./routes/articles');
    const usersRouter = require('./routes/users');
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(cors({ origin: 'http://localhost:4000' }));
    app.use("/", indexRouter);
    app.use("/articles", articlesRouter);
    app.use("/users", usersRouter);

    app.use(express.static(path.join(__dirname, "public")));

    app.use((req, res, next) => {
        const err = new Error("The requested resource couldn't be found.");
        err.status = 404;
        next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        const isProduction = environment === "production";
        res.json({
            title: err.title || "Server Error",
            message: err.message,
            errors: err.errors,
            stack: isProduction ? null : err.stack,
        });
    });
    module.exports = app;

    //In index.js
    const express = require("express");
    const path = require("path");
    const app = express();
    app.set("view engine", "pug");
    app.use(express.static(path.join(__dirname, "public")));

    app.get("/", (req, res) => {
        res.render("logged-in-homepage");
    });
    app.get("/users/new", (req, res) => {
        res.render("create-user");
    });
    app.get("/users/sign-in", (req, res) => {
        res.render("sign-in");
    });
    ```
- In frontend root folder create a folder called "public". In that folder create another folder called "public". In that folder create 3 files, "index.js, log-in.js, sign-up.js", This will be for sign-up/log-in authentication.
    ```js
    //In /public/index.js
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const res = await fetch('http://localhost:8080/api/articles', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Medium_Lite_ACCESS_TOKEN")}`
            }
            });
            if(res.status === 401) {
                window.location.href = "/splash";
                return;
            }
            const { articles } = await res.json();
            const articlesContainer = document.querySelector('#article-container');
            const articlesHtml = articles.map(
                ({ message }) => `
                <div class="card">
                    <div class="card-body">
                    <p class="card-text">${message}</p>
                    </div>
                </div>
                `
            );
            articlesContainer.innerHTML = articlesHtml.join("");
        } catch (e) {
            console.error(e);
        }
    });

    //In /public/log-in.js
    const logInForm = document.querySelector(".log-in-form");

    logInForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(logInForm);
        const email = formData.get('email');
        const password = formData.get("password");
        const body = { email, password };
        try {
            const res = await fetch("http://localhost:8080/users/token", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw res;
            }
            const {
                token,
                user: { id },
            } = await res.json();

            localStorage.setItem("Medium_Lite_ACCESS_TOKEN", token);
            localStorage.setItem("Medium_CURRENT_USER_ID", id);

            window.location.href - "/";
        } catch (err) {
            if (err.status >= 400 && err.status < 600) {
                const errorJSON = await err.json();
                const errorsContainer = document.querySelector(".errors-container");
                let errorsHtml = [
                    `
                    <div class="alert alert-danger">
                        Something went wrong. Please try again.
                    </div>
                    `,
                ];
                const { errors } = errorJSON;
                if (errors && Array.isArray(errors)) {
                    errorsHtml = errors.map(
                        (message) => `
                        <div class="alert alert-danger">
                            ${message}
                        </div>
                        `
                    );

                }
                errorsContainer.innerHTML = errorsHtml.join("");
            } else {
                alert(
                    "Something went wrong. Pleae check your internet connection and try again!"
                );
            }
        }
    });

    //In /public/sign-up.js 
    const signUpForm = document.querySelector(".sign-up-form");

    signUpForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(signUpForm);
        const email = formData.get("email");
        const password = formData.get("password");
        const username = formData.get("username");

        const body = { email, password, username };

        try {
            const res = await fetch("http://localhost:8080/users", {
                method: "POST",
                body: JSON.stringify(body), 
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw res;
            const {
                token,
                user: { id },
            } = await res.json();

            localStorage.setItem("Medium_Lite_ACCESS_TOKEN", token);
            localStorage.setItem("Medium_LITE_CURRENT_USER_ID", id);
            window.location.href = "/";
        } catch (err) {
            if (err.status >= 400 && err.status < 600) {
                const errorJSON = await err.json();
                const errorsContainer = document.querySelector(".errors-container");
                let errorsHtml = [
                    `
                    <div class="alert alert-danger">
                        Something went wrong. Please try again.
                    </div>
                    `,
                ];
                const { errors } = errorJSON;
                if (errors && Array.isArray(errors)) {
                    errorsHtml = errors.map(
                        (message) => `
                        <div class="alert alert-danger">
                            ${message}
                        </div>
                        `
                    );
                }
                errorsContainer.innerHTML = errorsHtml.join("");
            } else {
                alert("Something went wrong. Please check your internet connection and try again!");
            }
        }
    });


    ```
- In the backend root folder create a file called "auth.js" and "utils.js". This will be for creating the jwt Tokens.
    ```js
    //In utils.js
    const { validationResult } = require('express-validator');

    const handleValidationErrors = (req, res, next) => {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map((error) => error.msg);

            const err = Error("Bad request.");
            err.status = 400;
            err.title = "Bad request.";
            err.errors = errors;
            return next(err);
        }
        next();
    };

    const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

    module.exports = {
        asyncHandler,
        handleValidationErrors
    }

    //In auth.js
    const jwt = require("jsonwebtoken");
    const { jwtConfig } = require("./config");
    const { secret, expiresIn } = jwtConfig;
    const bearerToken = require('express-bearer-token');
    const { User } = require('./db/models');

    function restoreUser(req, res, next) {
        const { token } = req;

        if (!token) {
            return res.set("WWW-Authenticate", "Bearer").status(401).end();
        }

        return jwt.verify(token, secret, null, async (err, jwtPayload) => {
            // Define async function for jswtPayload logic
            if (err) {
                err.status = 401;
                return next(err);
            }
            const { id } = jwtPayload.data;

            try {
                req.user = await User.findByPk(id);
            } catch (e) {
                return next(e);
            }

            if (!req.user) {
                return res.set("WWW-Authenticate", "Bearer").status(401).end();
            }

            return next();
        })
    }

    function getUserToken(user) {

        const userDataForToken = {
            id: user.id,
            email: user.email,
        };
        const token = jwt.sign(
            { data: userDataForToken },
            secret,
            { expiresIn: parseInt(expiresIn, 10) }
        );
        return token;
    };

    const requireAuth = [bearerToken(), restoreUser];
    module.exports = { getUserToken, requireAuth };

    ```
- In the backend root folder create a folder called "routes". Create 3 files in there called "index.js, users.js, articles.js".
    ```js
    //In /routes/index.js
    const express = require('express');
    const router = express.Router();
    const { asyncHandler } = require('../utils');

    router.get("/", (req, res) => {
        res.json({ message: "test index root" });
    });

    module.exports = router;

    //In /routes/users.js
    const express = require('express');
    const router = express.Router();
    const { check } = require('express-validator');
    const { asyncHandler, handleValidationErrors } = require('../utils');
    const bcrypt = require('bcryptjs');
    const { Article, User } = require('../db/models');
    const { getUserToken } = require('../auth');
    router.use(express.urlencoded());

    const validateUsername =
        check("username")
            .exists({ checkFalsy: true })
            .withMessage("Please provide a username");

    const validateEmailAndPassword = [
        check("email")
            .exists({ checkFalsy: true })
            .isEmail()
            .withMessage("Please provide a valid email."),
        check("password")
            .exists({ checkFalsy: true })
            .withMessage("Please provide a password.")
    ];

    router.post("/", validateUsername, validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            hashedPassword
        });

        
        const token = getUserToken(user);
        res.status(201).json({
            user: { id: user.id },
            token,
        });
    }));

    router.post("/token", validateEmailAndPassword, asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findone({
            where: {
                email,

            },
        });
        if (!user || !user.validatePassword(password)) {
            const err = new Error("Login failed");
            err.status = 401;
            err.title = "Login failed";
            err.errors = ["The provided credentials were invalid."];
            return next(err);
        }
        const token = getUserToken(user);
        res.json({ token, user: { id: user.id} });

    }))

    module.exports = router;
    
    //In /routes/articles.js
    const express = require('express');
    const router = express.Router();
    const { asyncHandler } = require('../utils');
    const db = require('../db/models');
    const { Article } = db;
    const { check, validationResult } = require('express-validator');
    const { requireAuth } = require("../auth");

    router.use(express.urlencoded());

    router.use(requireAuth);

    const articleNotFoundError = (articleID) => {
        const error = new Error;
        error.title = 'Tweet Not Found';
        error.status = 404;
        error.message = `${articleID} was not found`;
        return error;
    }

    module.exports = router;
    ```
---


**Users**
- 
    **Creating an account**

    - When a user clicks the sign up button, there will be a route handler that is called. The route handler will render a sign up pug that has a form for the user to fill out.
        ```js
        app.get("/users/new", (req, res) => {
            res.render("user-form");
        });
        ```

    - Once the user submits the form, the server will need to verify the input data and make sure it meets the requirements. If it meets our requirements, then extract the data and put it in our database and redirect the user to users page
    ```js
    router.post("/users", validateFunction, asyncHandler(async (req, res) => {
        //grab user data
        //add to database
        res.redirect("/users");
    });
    ```

    - 