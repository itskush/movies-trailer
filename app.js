var createError = require('http-errors');
var express = require('express');
const serveStatic = require('serve-static')
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db = require('./models');

const cors=require("cors");
const corsOptions ={
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

require('dotenv').config()

var moviesRouter = require('./routes/movies');
var authRouter = require('./routes/auth');

var app = express();

const port = process.env.PORT || 3000;
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.sequelize.sync()

app.use('/api/movies', moviesRouter);
app.use('/api/auth', authRouter);
app.use('/', serveStatic(path.join(__dirname, '/client/dist')))

app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'))
})

app.listen(port, function(){
  console.log(`Listening on port: ${port}`)
});


module.exports = app;
