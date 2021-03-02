var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


let x = 5;
let myFavoriteFruit = "kiwi"
let viewCount = 0;
let movies = [
  {id: "01", title: "Citizen Kane", release: "1941", image: "https://www.gannett-cdn.com/presto/2020/11/11/NCDT/2e7b478c-2d52-4a34-9bdd-dae658ef6cba-Citizen-Kane-Welles-Podium.jpg"},
  {id: "02", title: "Seven Samurai", release: "1954", image: "https://static.rogerebert.com/uploads/review/primary_image/reviews/great-movie-the-seven-samurai-1954/EB20010819REVIEWS08401010356AR.jpg"},
  {id: "03", title: "Ran", release: "1985", image: "https://resizing.flixster.com/EiS5OiYLqqrpk5DCoDNFxrVt0kY=/206x305/v2/https://flxt.tmsimg.com/NowShowing/24039/24039_aa.jpg"},
  {id: "04", title: "I Lost My Body", release: "2019", image: "https://upload.wikimedia.org/wikipedia/en/e/e1/I_Lost_My_Body.jpg"}
]

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get("/boring", function(req,res) {
  res.send("This is a boring line of text");
})
app.get("/exciting", function(req, res) {
  res.render("exciting.ejs");
})
app.get("/dynamic_template_practice", function(req, res) {
  res.render("test.ejs", {x: x, favFruit: myFavoriteFruit, name: "alex"})
})
app.get("/really_exciting", function(req, res) {
  viewCount += 1;
  res.render("really_exciting.ejs", {counter: viewCount})
})
app.get("/display_my_array", function(req, res) {
  res.render("display_my_array.ejs", {movieTitles: movies})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
