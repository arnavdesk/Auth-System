const User = require("../models/user");
module.exports.create = async function (request, response) {
    if (request.body["password"] != request.body["confirm-password"]) {
        request.flash("error","Password and confirm password must be same!");
        console.log("password and confirm password not equal!");
        return response.redirect("back");
    }

    try {
        let user = await User.findOne({ email: request.body.email });
        if (!user) {
            let newUser = await User.create(request.body);
            request.flash("success","Welcome to Authy Please login!");
            console.log("User Created Hurrah!");
            return response.redirect("/sign-in");
        } else {
            request.flash("error","User already exists, Please log in!");
            console.log("User already exists")
            return response.redirect("/sign-in");
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.createSession = function (request, response) {
    request.flash("success","Logged In Successfully!");
    console.log("Session created");
    return response.redirect("/");
}

module.exports.destroySession = function (request, response) {
    request.flash("success","You have logged Out!");
    request.logout();
    return response.redirect("/sign-in");
}
