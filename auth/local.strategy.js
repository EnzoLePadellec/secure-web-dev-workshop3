const passport = require('passport');
const localStrategy = require ('passport-local')
const usersService = require('../users/users.service')

passport.use(new localStrategy({usernameField : 'username'},
    async function(username,password,done) {
        try {
            const user = await usersService.checkPassword(username,password)
            if(!user){return done(null,false);}
            return done(null,user);
        }
        catch(error) {
            if(error) {return done(error)}
        }
    }
))
