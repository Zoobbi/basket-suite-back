const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const authRouter = require('./src/auth/auth.router');
const gamesRouter = require('./src/games/games.router');
const leaguesRouter = require('./src/leagues/leagues.router');
const playersRouter = require('./src/players/players.router');
const teamsRouter = require('./src/teams/teams.router');
const historyRouter = require('./src/history/history.router');
const keys = require('./config/keys');

let server;

const app = express();
const { PORT } = keys;
const urlDB = `mongodb+srv://${keys.userName}:${keys.password}@clustergermany.rblnq.mongodb.net/${keys.dbName}`;
mongoose.connect(urlDB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

async function start(startServer) {
  try {
    console.log('START');
    const db = mongoose.connection;
    db.once('open', () => {
      console.log('we are connected to db');
      startServer();
    });
  } catch (e) {
    throw new Error`can't connent; ${e.message}`();
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(`${__dirname}/dist`)));


app.use(passport.initialize());
require('./middleware/passport')(passport);

/* app.get('/app/!*', (req,res) => {
    console.log('_______________')
    res.sendfile(path.resolve(__dirname,'dist','index.html'))
}); */

app.use('/api/auth', authRouter);
app.use('/api/leagues', passport.authenticate('jwt', { session: false }), leaguesRouter);
app.use('/api/players', passport.authenticate('jwt', { session: false }), playersRouter);
app.use('/api/teams', passport.authenticate('jwt', { session: false }), teamsRouter);
app.use('/api/games', passport.authenticate('jwt', { session: false }), gamesRouter);
app.use('/api/histories', historyRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  const errorMsg = res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ errorMsg });
});

/*
app.use('/!*',express.static('dist')); */
process.on('uncaughtException', (error) => {
  console.log(error);
  server.close();
});

start(() => server = app.listen(PORT, () => console.log(`Server has been started in PORT = ${keys.PORT}`)));
module.exports = app;
