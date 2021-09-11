const express = require('express');
const route = require('./route.js');
const app = express();

//Settings
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', route);

//Port
app.set('port', process.env.PORT || 3000);

//Setup for static files
app.use('/static', express.static('public'));

//404 error page
app.use((req, res, next) => {
    let err = new Error('File not found');
    err.status = 404;
    next(err);
});

//Error page
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {message: err.message})
});

//Start listening on port
const server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
