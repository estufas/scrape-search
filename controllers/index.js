var express = require('express');
var router = express.Router();
var db = require('../models');
var flash = require('connect-flash');
var bodyParser = require('body-parser');



// router.get('/', function(req, res) {
// 	res.render('index');
// })

router.route('/')
	.get(function(req, res) {
		// console.log("hello")

		res.render('index');
	})
	.post(function(req, res) {
		if(!req.body.search) {
			console.log("hello from if");
			req.flash('danger', 'cant search for nothing');
			res.redirect('/');
		} else {
			console.log("hello frfom else");
			db.link.findAll({
				where: {
					title: {
						$iLike: "%" + req.body.search + "%"
					}
				}
			}).then(function(titles){
				// console.log(titles);
				res.render('index', {titles: titles});
			})
		}
	})


module.exports = router;