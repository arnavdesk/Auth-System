const express = require("express");
const router = express.Router();


const homeController = require("../controllers/home_controller")


router.get("/", homeController.signIn);
router.get("/sign-up", homeController.signUp);


module.exports = router;