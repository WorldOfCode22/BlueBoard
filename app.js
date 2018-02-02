/* eslint-disable no-console */
const express = require('express');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = 3000;
const keys = require('./config/keys');
const mongoose = require('mongoose');
const graphQLExpress = require('express-graphql');
const Schema = require('./graphql/query/schema');
const mutation = require('./graphql/mutation');
const User = require('./mongoose/models/user');
const routes = require('./routes');

mongoose.connect(keys.database.URI).then(
  () => {
    console.log('Database Connected');
  },
  (err) => {
    console.log(`Database connection error: ${err}`);
  },
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'the dog ate my homework',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(
  '/graph',
  graphQLExpress(request => ({
    graphiql: true,
    schema: Schema,
    mutation,
    rootValue: request.session,
  })),
);

app.use('/api', routes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
