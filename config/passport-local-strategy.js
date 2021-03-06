const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt")
const saltRounds = 10;

// apply local stragegy and handle case for signing in and out
passport.use(new localStrategy({
    usernameField: "email",
    passReqToCallback: true
},
    function (request, email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log("error finding in user --> passport");
                request.flash("error", "Internal Error");
                return done(err);
            }
            if (!user) {
                console.log("Invalid username password");
                request.flash("error", "Invalid Username or Password!");
                return done(null, false);
            }
            else {
                console.log(password);
                console.log(user);
                bcrypt.compare(password, user.password, function (err, result) {
                    if (!result) {
                        console.log("Invalid username password");
                        request.flash("error", "Invalid Username or Password!");
                        return done(null, false);
                    }
                    else {
                        return done(null, user);
                    }
                });
            }
        })
    }
));


// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

// deserializing the user to decide which key is to be kept in cookies

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("error finding in user --> passport --> Desirialize");
            return done(err);
        }
        return done(null, user);
    })
})


passport.checkAuthentication = function (request, response, next) {
    // if user is signed in then pass on request to next function(controllers action);
    if (request.isAuthenticated()) {
        return next();
    }
    else {
        // if user is not signed in then redirect
        request.flash("error", "Please Sign In!");
        return response.redirect("/sign-in");
    }
}

passport.checkSessionPresent = function (request, response, next) {
    // if user is signed in then don't go to sign in/up page
    if (request.isAuthenticated()) {
        request.flash("error", "Already Signed In!");
        return response.redirect("/");
    }
    else {
        // if user is not then go
        return next();
    }
}


passport.setAuthenticatedUser = function (request, response, next) {
    if (request.isAuthenticated()) {
        // request.user contains the current
        //  signed in user from session cookie and we are just sending in 
        // to user for views
        response.locals.user = request.user;
    }
    next();
}

module.exports = passport;