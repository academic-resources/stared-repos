var express = require('express')
var mongoose = require('mongoose')
var app = express()
var bodyParser = require('body-parser')
var bcrypt = require('bcryptjs')
var secrets = require('./secrets')

// encrypted cookies, by mozilla
var sessionsModule = require('client-sessions')

var sessionsMiddleware = sessionsModule({
    // we call the sessionsModule, passing in an object defining how the sessions middleware should work.
    // the sessionsModule then returns the sessionsMiddleware function
    cookieName: 'in-class-auth-demo-cookie',
    // in a later lecture, we will learn how to NOT put secrets directly in our source code
    secret: secrets.cookieSecret,
    requestKey: 'session',
    duration: 86400 * 1000 * 7, // one week in milliseconds
    cookie: {
        httpOnly: true,
        secure: false, // use `secure:true` if you're deployed using HTTPS
    }
})
app.use(sessionsMiddleware)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost/authentication-demo', function(mongooseErr){
    if (mongooseErr) { console.log(mongooseErr)}
    else { console.log('Mongoose initialized!')}
})

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: function(){ return new Date()}
    }
})
var User = mongoose.model('User', UserSchema)

// anything in the folder './public' can be requested directly by name
app.use(express.static('./public'))

var checkIfLoggedIn = function(req, res, next){
    if ( req.session._id ) {
        console.log("user is logged in. proceeding to next route handler")
        next()
    }
    else {
        res.redirect('/register')
    }
}

app.use(function(req, res, next){
    console.log('session? ', req.session)
    next()
})

app.get('/', function(req, res){
    res.sendFile('./public/html/index.html', {root:'./'})
})

app.get('/register', function(req, res){
    res.sendFile('./public/html/register.html', {root: './'})
})

app.post('/register', function(req, res){
    console.log('request body? ', req.body)

    var newUser = new User(req.body)
    bcrypt.genSalt(11, function(saltErr, salt) {
        if (saltErr) { console.log(saltErr)}
        console.log('salt? ', salt)
        bcrypt.hash(newUser.password, salt, function(hashErr, hashedPassword){
            if (hashErr) { console.log(hashErr) }
            newUser.password = hashedPassword
            newUser.save(function(err){
                if (err) { console.log('failed to save user')}
                else {
                    req.session._id = newUser._id
                    res.send({success:'success!'})
                }
            })

        })
    })

})

app.post('/login', function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
        if ( err ) {
            console.log('failed to find user')
            res.send({failure:'failure'})
        }
        else if ( !user ) {
            res.send({failure:'failure'})
        }
        // this person is trying to log in as a user who DOES exist in our database,
        // but do the passwords match?
        else {
            // bcrypt.compare will hash req.body.password using the salt in user.password, and then compares if the resulting hash matches user.password
            bcrypt.compare(req.body.password, user.password, function(bcryptErr, matched){
                if (bcryptErr) {
                    console.log(bcryptErr)
                    res.send({failure:'failure'})
                }
                else if ( !matched ) {
                    console.log('passwords dont match')
                    res.send({failure:'failure'})
                }
                else if ( matched ) {
                    // the user's password hashed to an exact match of the hash stored in the database

                    // 
                    req.session._id = user._id
                    res.send({success:'success'})
                }
            })
        }

    }) 
})



// we use our checkIfLoggedIn middleware horizontally so we can be more specific about which routes it applies to
app.get('/dashboard', checkIfLoggedIn, function(req, res){
    res.sendFile('./public/html/dashboard.html', {root:'./'})
})

app.get('/logout', function(req, res){
    // ends the session, clears the session object, invalidates the user's cookie.
    // the reset() method is made available to us from the client-sessions middleware
    req.session.reset()
    res.redirect('/register')
})

app.get('/who-am-i', checkIfLoggedIn, function(req, res){
    User.findById(req.session._id, function(err, user){
        if ( err ) { console.log(err)}
        res.send({
            success:'success!',
            user: user,
        })
    })
})



app.listen('80', function(){
    console.log('app is running on port 8080')
})