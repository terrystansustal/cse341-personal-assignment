// app.js will be the main server for this program

const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const mongodb = require("./db/connection");
const passport = require("passport");
require('./auth');

const studentsRoutes = require('./routes/students');

// If the request has a user already, bring it to the next point. If not, error code of 401 = unauthorized
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const port = process.env.port || 8080;
const app = express();

app
  .use(session({ secret: 'cats'}))
  .use(passport.initialize())
  .use(passport.session())

  .get('/', (req, res) => {
    res.send('<a href="/auth/google">Log in with Google</a>');
  })

  // Use Passport strategy
  .get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }))

  .get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  }))

  .get('/auth/failure', (req, res) => {
    res.send('Something went wrong. Please try again.')
  })

  // This is the link that will open once the user logs in
  .get('/protected', isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.displayName} <a href="/students">Students</a> <a href="https://cse341-personal-assignment-uohb.onrender.com/api-docs">API DOCS</a> <a href="/logout">Log out</a>`);
  })

  .use((req, res, next) => {
    // Apply isLoggedIn middleware here to protect the '/students' route
    isLoggedIn(req, res, next);
  })
  .use('/students', studentsRoutes)

  .get('/logout', (req, res) => {
    req.logout(function(err) {
      if (err) {
        console.error(err);
      }
      req.session.destroy(function(err) {
        if (err) {
          console.error(err);
        }
        res.send('Thanks for using our app.');
      });
    });
  })

  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

  process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});