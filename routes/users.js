const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");


router.post("/create", usersController.create);


// use passpt as a middleware to auth
router.post("/create-session", passport.authenticate(
    "local",
    { failureRedirect: "/sign-in" }
), usersController.createSession);

// sign-out
router.get("/sign-out", usersController.destroySession);

router.get("/auth/google", passport.authenticate("google",{scope:["profile","email"]}));

router.get("/auth/google/callback", passport.authenticate("google",{ failureRedirect: "/sign-in" }),usersController.createSession);

module.exports = router;