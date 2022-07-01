const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // put this require statement before the PASSPORT require statement (otherwise it throws error)
require('./services/passport'); // does not need CONST cause 'require('./services/passport')' doesn't return anything?


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 2592000000, //30 days in ms
        keys: [keys.cookieKey],
    })
) 

app.use(passport.initialize());
app.use(passport.session()); // asks passport to use cookie session

require('./routes/authRoutes')(app); // returns function from authRoutes passing 'app' as parameter

const PORT = process.env.PORT || 5000;
app.listen(PORT);
