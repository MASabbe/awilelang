const functions = require('firebase-functions');
const admin		= require('firebase-admin');
const express	= require('express');
const engines	= require('consolidate');

const app		= express();

const firebaseApp	= admin.initializeApp(
	functions.config().admin
);

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/time', (req, res)=>{
	res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	res.render('index')
});
exports.app = functions.https.onRequest(app);
