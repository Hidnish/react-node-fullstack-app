const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { //8
    done(null, user.id); //done(null, _id from mongoDB) rather than: done(null, Google profile ID)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
})

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback', //2
		},
        //3, 7
		(accessToken, refreshToken, profile, done) => {
            User.findOne({ googleID: profile.id }) // IT'S A PROMISE
                .then(existingUser => {
                    if (existingUser) {
                        done(null, existingUser); //5
                    } else {
                        new User({googleID: profile.id}) 
                            .save() //4
                            .then(user => done(null, user)); // 'user' is another model instance with same values as User
                    }
                }) 
		}
	)
); //1

//1 'Passport! I want you to be aware that this type of authentication is possible (Google oauth)'
//2 The route the user will be sent to after they grant permissions to our application
//3 This callback function is auto-called when a user is redirected back to out application from the Google auth flow
//4 Create new instance of User (based on User model class) in mongoDB
//5 null(firstArg, secondArg) -> firstArg: error, secondArg: tells passport that we're done and passes a database object
//6 When user is redirected to the '/auth/google/callback', the callback function: passport.authenticate('google')
//  allows access to the accessToken --> //7 
//8 serizalizeUser -> identify user and generate cookie
