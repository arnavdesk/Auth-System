const User = require("../models/user");
const bcrypt = require("bcrypt")
const saltRounds =10;
module.exports.create = async function (request, response) {
    if (request.body["password"] != request.body["confirm-password"]) {
        request.flash("error","Password and confirm password must be same!");
        console.log("password and confirm password not equal!");
        return response.redirect("back");
    }

    try {
        let user = await User.findOne({ email: request.body.email });
        if (!user) {
            request.body.password = await bcrypt.hash(request.body.password, saltRounds);
            request.body.auth = "local";
            request.body.avatar="";
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

module.exports.profile = function(request,response){
    return response.render("profile");
}

module.exports.update = async function (request, response) {
    try {
        if (request.query.id == request.user.id) {
            let userFound =  await User.findById(request.query.id);
            let result = await bcrypt.compare(request.body.password, userFound.password);
            if (result) {
                await User.findByIdAndUpdate(request.query.id,{name:request.body.name,email:request.body.email});
                request.flash("success","Profile Updated Successfully!");
                return response.redirect("back");
            }else {
                request.flash("error","Wrong Password!");
                return response.redirect("back");
            }
        } else {
            return response.status(401).send("Unauthorized!");
        }
    }
    catch(err){
        request.flash("error","Error Updating Profile!");
        console.log(err);
        return response.redirect("back");
    }
}

module.exports.resetPassword = async function (request, response) {
    console.log(request.body);
    try {
        if (request.query.id == request.user.id) {
            if(request.body["new-password"] != request.body["confirm-password"]){
                request.flash("error","Password and confirm password must be same!");
                console.log("password and confirm password not equal!");
                return response.redirect("back");
            }
            let userFound =  await User.findById(request.query.id);
            let result = await bcrypt.compare(request.body['old-password'], userFound.password);
            if (result) {
                let newPassword = await bcrypt.hash(request.body['new-password'], saltRounds);
                await User.findByIdAndUpdate(request.query.id,{password:newPassword});
                request.flash("success","Password Updated Successfully!");
                return response.redirect("back");
            }else {
                request.flash("error","Wrong Password!");
                return response.redirect("back");
            }
        } else {
            return response.status(401).send("Unauthorized!");
        }
    }
    catch(err){
        request.flash("error","Error Updating Profile!");
        console.log(err);
        return response.redirect("back");
    }
}