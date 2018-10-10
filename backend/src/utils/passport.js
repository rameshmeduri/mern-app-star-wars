var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

import db from './db';
import config from '../config';

const opts = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : config.secret
};

function getJwtStrategy() {
  return new JwtStrategy(opts, (jwt_payload, done) => {
    let user = db.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}

export default getJwtStrategy;
