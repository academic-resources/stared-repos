const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const searchRouter = require('./routes/search');
const suggestRouter = require('./routes/suggest');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/search', searchRouter);
app.use('/suggest', suggestRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.json(
        {
            message: err.message,
            error: req.app.get('env') === 'development' ? err : {}
        }
    )
});

module.exports = app;
