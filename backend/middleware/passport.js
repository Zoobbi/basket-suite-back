const JwtSrategy = require('passport-jwt').Strategy;
const ExtractJws = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

const options = {
  jwtFromRequest: ExtractJws.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt,
};

module.exports = (passport) => {
  passport.use(
    new JwtSrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id');

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        throw new Error('passport error');
      }
    }),
  );
};
