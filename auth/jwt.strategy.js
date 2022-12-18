const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require("../users/users.model");

passport.use(new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    (token,done) => {
        User.findOne({_id: token._id}, function(err,user) {
            if(err) return done(err,false);
            if(user) return done(null,user);
            return done(null,false);
        });
    }
))