var express = require('express');
var router = express.Router();
var db = require('../models');
var flash = require('connect-flash');
var bodyParser = require('body-parser');

router.route('/')
	.get(function(req, res) {
		// console.log(req.session.currentUser)
		if(req.session.currentUser) { 
			db.submission.findAll(
				{where: {
					userId: req.session.currentUser.id
				}
			}).then(function(submissions) {
				res.render('posts/index', {submissions: submissions})		
			})
		} else {
			db.submission.findAll().then(function(submission) {
				res.render('posts/index', {submission: submission})
			})
		}
		
		
	})
	.post(function(req, res){
		if(req.body.title && req.body.body) {
			var newPost = {
				title: req.body.title,
				body: req.body.body,
				userId: req.session.currentUser.id
			}
			db.submission.create(newPost).then(function(){
				
				res.redirect('/posts');
			})
		} else {
			res.redirect('/posts');
		}
	})

	.delete(function(req, res) {
  		db.submission.destroy({
    		where: {
      			id: req.body.id
      		}
  		}).then(function() {
    		console.log('HELLO FROM INSIDE .DELETE');
    		res.send({'msg': 'success'});
  		}).catch(function(e) {
    		res.send({'msg': 'error', 'error': e});
  		});
	});
router.route('/edit/:id')
	.get(function(req, res){
		var id = req.params.id;
		db.submission.find({
			where: {
				id: id
			}
		}).then(function(submission) {
			res.render('posts/edit', {submission: submission});
		})
		
		//display form with pre-filled vaues from database.
	})
	.put(function(req, res){
		console.log('CAN YOU SEE ME _______________________________')
		db.submission.update(
			{
   				title: req.body.title,
   				body: req.body.body
			},
			{
				where: {
					id: req.params.id
				}
			}
		).then(function() {
			//res.redirect('/posts');
			res.status(200).send('Updated');
		})
		// save edits to the database
	})


module.exports = router;