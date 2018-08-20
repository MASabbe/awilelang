const functions 		= require('firebase-functions');
const admin				= require('firebase-admin');
const express			= require('express');
const engines			= require('consolidate');
const path   			= require('path');
const session 			= require('express-session');
const bodyParser 		= require('body-parser');
const cookieParser		= require('cookie-parser');
const serviceAccount 	= require('./service_account.json');
const cors = require('cors')({origin: true});

const app		= express();

const firebaseApp	= admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});


app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing
app.use(cookieParser());
app.use(cors);

/**/

const handleErrors = (username, err) => {
	console.error({User: username}, error);
    res.sendStatus(500);
    return;
}
const handleRespons = (username, status, body) => {
	console.log({User: username}, {
      Response: {
        Status: status,
        Body: body,
      },
    });
    if (body) {
      res.status(200).json(body);
      return;
    }
    res.sendStatus(status);
    return;
}
/*
const validateFirebaseIdToken = async (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !(req.cookies && req.cookies.__session)) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>',
        'or by passing a "__session" cookie.');
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if(req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send('Unauthorized');
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  }
};
*/

app.get('/admin/', (req, res)=>{
	res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	res.render('index')
});

app.post('/admin/', (req, res)=>{
	console.log('post login '+req.body.uid);
	var UID = req.body.uid;
	var additional = {administrator : true};

	admin.auth().createCustomToken(UID, additional)
	.then(function(customToken) {
	  // Send token back to client
	  
	})
	.catch(function(error) {
	   console.log("Error creating custom token:", error);
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


exports.app = functions.https.onRequest(app);
