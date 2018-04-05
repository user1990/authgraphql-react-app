const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const models = require('./models/models');
const schema = require('./schema/schema');
// Webpack
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const app = express();
dotenv.config();

// MongoDb connection
const { MONGODB_URL } = process.env;
if (!MONGODB_URL) {
  throw new Error('You must provide a MongoDB URL');
}

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

// Middlewares
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: new MongoStore({
      url: MONGODB_URL,
      autoReconnect: true,
    }),
  })
);
app.use(logger('dev'));
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
