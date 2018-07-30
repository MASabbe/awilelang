const functions = require('firebase-functions');
const admin		= require('firebase-admin');
const express	= require('express');
const engines	= require('consolidate');

const app		= express();

const firebaseApp	= admin.initializeApp(
	functions.config().admin
);
const HTTP_SERVER_ERROR = 500;

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
	res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	res.render('index')
});

app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || HTTP_SERVER_ERROR).render('500');
});
exports.app = functions.https.onRequest(app);
