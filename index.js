// Require in a few modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

//for real

// Register a couple of models with mongoose
require('./models/User');
require('./models/Blog');
// Set up passport for authentication
require('./services/passport');
require('./services/cache');

// Set up our Mongoose instance
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

// Create our Express Application
const app = express();

// Set up a few  Middlware
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Register our Event handlers
require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);

// Set up some  production file serving
if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

// Now our App is listening on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
