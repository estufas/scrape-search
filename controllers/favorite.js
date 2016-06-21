var express = require('express');
var router = express.Router();
var db = require('../models');
var flash = require('connect-flash');
var bodyParser = require('body-parser');


router.route('/')
	.get(function(req, res) {

		db.user.findById(req.session.currentUser.id).then(function(user) {
			user.getLinks().then(function(links){
				res.render('favorite/index', {links: links})
			})
		})
			// res.render('favorite/index');
	})
	.post(function(req, res) {
		// console.log(req.session.currentUser.id);
		db.user.findById(req.session.currentUser.id).then(function(user) {
			user.hasLink(req.body.id).then(function(foundLink){
				console.log('------------------------------------')
				console.log('foundLink === '+foundLink);
				console.log('------------------------------------')
				if(foundLink === false) {
					user.addLink(req.body.id).then(function(){
					res.redirect('/favorite');
				})
			} else {
				console.log('foundLink should be false');
				res.redirect('/favorite');
			}
			})
		})
	})



module.exports = router;