const functions = require('firebase-functions');
const admin		= require('firebase-admin');
const express	= require('express');
const engines	= require('consolidate');
const path   	= require('path');
const session 	= require('express-session');
const body 		= require('body-parser');

const app		= express();

const firebaseApp	= admin.initializeApp(
	functions.config().admin
);

const HTTP_SERVER_ERROR = 500;

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');


app.get('/admin/', (req, res)=>{
	res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	res.render('index')
});

app.post('/admin/', (req, res)=>{
	var useremail = req.body.username;
	var userpassword  = req.body.userpass;

	admin.auth().signInWithEmailAndPassword(useremail, userpassword)
	.then(function () {
		res.send("success");
		console.log("success login admin".useremail);
	})
	.catch(function(err){
		res.send("fail");
		console.log("Error while executing firebase.auth() ",err);
	});
});

app.get('/admin/home', (req, res)=>{
	res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	res.render('dashboard');
});

app.get('/', (req, res)=>{
	res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	res.render('home');
});


app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || HTTP_SERVER_ERROR).render('500');
});
exports.app = functions.https.onRequest(app);
