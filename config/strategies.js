var db = require('../models');
var LocalStrategy = require('passport-local').Strategy;

module.exports = {
	localStrategy: new LocalStrategy({
		usernameField: 'email'
	},
	function(email, password, done) {
		db.user.find({
			where: {
				email: email
			}
		}).then(function(user){
			if(user) {
				user.checkPassword(password, function(err, result) {
					if(err) return done(err);
					if(result) {
						done(null, user.get());
					} else {
						done(null, false, {message: 'Invalid Password'});
					}
				});
			} else {
				done(null, false, {message: 'not a user'});
			}
		});
	}
	),
	serializeUser: function(user, done) {
    	done(null, user.id);
  	},
  	deserializeUser: function(id, done) {
    	db.user.findById(id).then(function(user) {
      		done(null, user.get());
    	}).catch(done);
  	}
}