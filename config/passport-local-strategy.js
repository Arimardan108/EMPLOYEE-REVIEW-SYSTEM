const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Authentication using Passport
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        //Find a User and establish a identity
        User.findOne({ email: email }).then(function (user) {
            if (!user || user.password != password) {
                req.flash('error', 'Invalid UserName/Password');
                return done(null, false);
            }
            return done(null, user);

        }).catch(function (error) {
            console.log('Error in finding the User')
            return done(error);
        })
    }
))


//Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

//Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
        return done(null, user);
    }).catch(function (error) {
        console.log('Error in finding the user--Passport');
        return done(error);
    })
})

//check if the User is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if the user is signed in then pass on the request to next function(Controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/Signin');
}

passport.setAuthenticatedUser = function (req, res, next) {
    //req.user contains the current signed in the user from the session cookies and we are sending this to the locals for the views
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }

    next();

}

passport.restrictAccess = function (req, res, next) {

    if (req.isAuthenticated()&&req.user.permission!='admin') {

        return res.redirect('back');
    }

    next();
}

passport.restrictAccessPages = function (req, res, next) {

    if (req.isAuthenticated()&&req.user.permission=='admin') {

        next()
    }
    else{
        return res.redirect('back');
    }
    
    
}


module.export = passport;