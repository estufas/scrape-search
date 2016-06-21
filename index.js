// Express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var strategies = require('./config/strategies');



// Modules
var request = require('request');
var $ = require('Cheerio');
var async = require('async');
db = require('./models');

// Controllers
var indexPage = require('./controllers/index');
var favoriteController = require('./controllers/favorite');
var postsController = require('./controllers/posts');

// Set View Engine and Static Folder
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/assets/static'));
app.use(ejsLayouts);
app.use(session({
  secret: 'stuarthassececrets',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(strategies.serializeUser);
passport.deserializeUser(strategies.deserializeUser);

passport.use(strategies.localStrategy);

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});


// Use Controllers
app.use('/', indexPage);
app.use('/favorite', favoriteController);
app.use('/posts', postsController);
app.use('/auth', require('./controllers/auth'));

app.get('/url', function(req, res) {
	// res.send('url')
	request('http://crimethinc.com/texts/atoz/', function(err, resp, html) {
		if(!err && resp.statusCode == 200) {
			var parsedHTML = $.load(html);
			var linkArray = [];
			var textArray = [];
			parsedHTML('.threemenu a').map(function(i, pl) {
				var text = 'http://crimethinc.com/' + $(pl).attr('href')
				if(!(text)) return;
				linkArray.push(text);
			});
			parsedHTML('.threemenu a').map(function(i, pl){
				// console.log(i)
				var text = $(pl).text();
				if(!(text)) return;
				textArray.push(text);
			});
			var linksAndHeadlines = {
				link: linkArray,
				headlines: textArray
			}
			linkArray.forEach(function(link, i) {
				db.link.findOrCreate({
					where: {
						link: linkArray[i],
						title: textArray[i]
					}
				}).spread(function() {
					res.redirect('/');
				})
			})
		// res.send(linksAndHeadlines);
		}
	})
})

app.listen(process.env.PORT || 3000)