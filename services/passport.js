const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { //8
    done(null, user.id); //done(null, _id from mongoDB) rather than: done(null, Google profile ID)
})

passport.deserializeUser(async (id, done) => { //9
    const user = await User.findById(id);
    done(null, user)
})

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback', //2
            proxy: true // trust heroku proxy to avoid taking away SSL from app's URL (https)
		},
        //3, 7
		async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleID: profile.id }) // IT'S A PROMISE
            
            if (existingUser) {
                return done(null, existingUser); //5
            } 

            const user = await new User({googleID: profile.id}).save() //4
            done(null, user); // 'user' is another model instance with same values as User
		}
	)
); //1

//1 'Passport! I want you to be aware that this type of authentication is possible (Google oauth)'
//2 The route the user will be sent to after they grant permissions to our application
//3 This callback function is auto-called when a user is redirected back to out application from the Google auth flow
//4 Create new instance of User (based on User model class) in mongoDB
//5 done(firstArg, secondArg) -> firstArg: error, secondArg: tells passport that we're done and passes a database object
//  'return' the result allows to avoid having to use the 'else' statement in the 'if' statement
//6 When user is redirected to the '/auth/google/callback', the callback function: passport.authenticate('google')
//  allows access to the accessToken --> //7 
//8 serizalizeUser -> called automatically with the User model fetching, 
//  it identifies user and generate an identifying piece of data for later use and puts it inside the user's cookie
//9 with a request, cookie is added to the request by the browser, then passport passes the id (piece of data inside the cookie)  
//  to the function deserializeUser (id = id inside the cookie)
