const express = require('express');
const app = express();
const http = require('http').createServer(app);
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const passportSocketIo = require('passport.socketio');
const path = require('path');
const morgan = require('morgan');

const auth = require('./auth.js');
const routes = require('./routes.js');
const socketio = require('./socketio.js');

require('dotenv').config();

const port = process.env.PORT || 3001;

app.use(helmet());
// app.use(helmet({ hidePoweredBy: { setTo: 'ADF1823Y3HASDF8132' } }));
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//io
io.use(
  passportSocketIo.authorize({
    key: 'express.sid',
    secret: process.env.SESSION_SECRET,
    store: sessionStore
  })
);

socketio(io);

http.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});
