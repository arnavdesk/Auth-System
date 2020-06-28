const express = require("express");
const router = express.Router();
const passport = require("passport");

const indexController = require("../controllers/index_controller")


router.get("/",passport.checkAuthentication ,indexController.home);
router.get("/sign-in", passport.checkSessionPresent ,indexController.signIn);
router.get("/sign-up", passport.checkSessionPresent ,indexController.signUp);
router.use("/users", require("./users"));


module.exports = router;