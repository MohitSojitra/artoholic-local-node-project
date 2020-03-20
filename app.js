// for scheduling

const Apps = require("./models/appModel");
const fetch = require("node-fetch");
const parser = require("node-html-parser");

// end of scheduling



const corn = require("node-cron");

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var config = require("./config")
var passport = require("passport")

// connection with the mongodb

const mongoose = require("mongoose");
const url = config.mongod;

const connect = mongoose.connect(url, {
  useNewUrlParser: true
});

connect.then((db) => {
  console.log("connect successfully");
}).catch((err) => next(err))



corn.schedule('0 0 10 * * *', () => {
  console.log("Schedule run");
  Apps.find({})
    .then(async (apps) => {
      console.log("mohit hai ", apps)
      for (app of apps) {
        console.log(app);
        console.log(app.appUrl);
        let res = await fetch(app.appUrl);
        const data = await res.text();
        const doc = parser.parse(data)
        const rating = doc.querySelector(".BHMmbe").childNodes[0].rawText;
        const review = doc.querySelector(".EymY4b").childNodes[1].childNodes[0].rawText;
        
        app.rating = rating;
        app.review = review;
        app.save()
        .then((app)=>{
          console.log("successfully saved");
        })
        .catch((err) => console.log(err))
      }
    }).catch((err) => console.log(err));
});




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var appRouter = require('./routes/appRouter');
var appImageRouter = require("./routes/appImageRouter");
var accountRouter = require("./routes/accountRouter");

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// app.use(cookieParser());

app.use(passport.initialize())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apps', appRouter);
app.use("/images", appImageRouter);
app.use("/accounts", accountRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;