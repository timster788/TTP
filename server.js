const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const { PORT, MONGODB_URI, CLIENT_ORIGIN } = require('./config');
const path = require('path')
const localStrategy = require('./passport/localStrategy');
const jwtStrategy = require('./passport/jwt');

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const portfolioRouter = require('./routes/portfolios');
const transactionRouter = require('./routes/transactions');
passport.use(localStrategy);
passport.use(jwtStrategy);
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});
const app = express();
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);

  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);


/*======CORS Middleware=====*/
// const corsOption = {
//   origin: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true
// };
// app.use(cors(corsOption));
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);



app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/portfolio', jwtAuth, portfolioRouter);
app.use('/api/transactions', jwtAuth, transactionRouter);
app.use('/api', authRouter);
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.use(express.static(path.join(__dirname, 'client/build')));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

// function runServer(port = PORT) {
//   const server = app
//     .listen(port, () => {
//       console.info(`App listening on port ${server.address().port}`);
//     })
//     .on('error', err => {
//       console.error('Express failed to start');
//       console.error(err);
//     });
// }

// if (require.main === module) {
//   dbConnect();
//   runServer();
// }

// Listen for incoming connections
if (require.main === module) {
  // Connect to DB and Listen for incoming connections
  mongoose
    .connect(MONGODB_URI)
    .then(instance => {
      const conn = instance.connections[0];
      console.info(
        `Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`
      );
    })
    .catch(err => {
      console.error(err);
    })
    .then(() => {
      app
        .listen(PORT, function() {
          console.info(`Server listening on ${this.address().port}`);
        })
        .on('error', err => {
          console.error(err);
        });
    });
}

module.exports = { app };
