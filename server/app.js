require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger  = require('morgan');
const path = require('path');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");
const cors = require("cors");

    

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
var whitelist = [
  'http://localhost:3000',
  'http://localhost:3010',
  'http://localhost:3001',
  'https://ea1eg.now.sh',
  'https://ea1eg.com',
  'https://www.ea1eg.com',
];
var corsOptions = {
  origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

/* app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
})); */
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});
  

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);
app.disable('etag');  

const index = require('./routes/index');
app.use('/', index);

const ping = require('./routes/ping');
app.use('/api/ping', ping);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const postcardCRUD = require('./routes/postcardCRUD');
app.use('/api/postcard', postcardCRUD(require('./models/Postcard')));

const yearGet = require('./routes/yearGet');
app.use('/api/year', yearGet(require('./models/Postcard')));

const regionGet = require('./routes/regionGet');
app.use('/api/region', regionGet(require('./models/Postcard')));

const searchGet = require('./routes/searchGet');
app.use('/api/search', searchGet(require('./models/Postcard')));

const randomGet = require('./routes/randomGet');
app.use('/api/random', randomGet(require('./models/Postcard')));

const cloudinary = require('./routes/uploadCloud');
app.use('/api/uploadimg', cloudinary);


module.exports = app;
