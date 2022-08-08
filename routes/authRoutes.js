const passport = require('passport');

// export this function to be used in 'index.js'
module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'], //3, 4, 5
			prompt: 'select_account'
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google')); //6

	app.get('/api/logout', (req, res) => {
		req.logout(); //8
		res.send(req.user);
	})

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
		// req.session -> contains data that PASSPORT is trying to store inside the cookie (value = _id from Mongo)
	})
};

//3 GoogleStrategy (the class) -> has a string identifier: 'google' that can be used as a reference by PASSPORT
//4 Whenever a user comes to this route you put them in the auth flow managed by PASSPORT
//5 SCOPE specifies what info we want to have access to
//6 When user is redirected to the '/auth/google/callback', the callback function: passport.authenticate('google')
//  allows access to the accessToken --> //7 (in passport.js)
//8 built in passport function that takes the cookie and kills the id attached
