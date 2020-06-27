const express = require("express");
const router = express.Router();


const indexController = require("../controllers/index_controller")


router.get("/", indexController.home);
router.get("/sign-in", indexController.signIn);
router.get("/sign-up", indexController.signUp);


module.exports = router;