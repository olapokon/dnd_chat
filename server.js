const express = require('express');
const app = express();
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const passportSocketIo = require('passport.socketio');
//const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const auth = require('./auth.js');
const routes = require('./routes.js');
const socketio = require('./socketio.js');

require('dotenv').config();

const port = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongoose database connection
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database');
});
const sessionStore = new MongoStore({ mongooseConnection: db });

//mongoose session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    key: 'express.sid',
    store: sessionStore
  })
);

//auth
auth(app, db);

//routes
routes(app, db);

//io
io.use(
  passportSocketIo.authorize({
    //cookieparser: cookieParser,
    key: 'express.sid',
    secret: process.env.SESSION_SECRET,
    store: sessionStore
  })
);

socketio(io);

http.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});
