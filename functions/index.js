const functions 		= require('firebase-functions');
const admin				= require('firebase-admin');
const express			= require('express');
const engines			= require('consolidate');
const path   			= require('path');
const session 			= require('express-session');
const bodyParser 		= require('body-parser');
const serviceAccount 	= require('./service_account.json');

const app		= express();

const firebaseApp	= admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const uid = "awi-admin";
const additional = {administrator : true};
const HTTP_SERVER_ERROR = 500;

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing

app.get('/admin/', (req, res)=>{
	res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	res.render('index')
});

app.post('/admin/', (req, res)=>{
	console.log('post login '+req.body.uid);
	
	admin.auth().getUser(req.body.uid)
	.then(function(userRecord) {
	// See the UserRecord reference doc for the contents of userRecord.
	console.log("Successfully fetched user data:", userRecord.toJSON());
	})
	.catch(function(error) {
	console.log("Error fetching user data:", error);
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
