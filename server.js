const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true , useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

app.use(session({
    secret: keys.sessionKey,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./models/Activity');
require('./routes/auth')(app);
require('./routes/activity')(app);
require('./routes/social')(app);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public');

app.get('*', (req, res) => res.sendFile(__dirname  + '/public/index.html'));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () =>
    console.log(`Server is running on port ${app.get('port')}`));
