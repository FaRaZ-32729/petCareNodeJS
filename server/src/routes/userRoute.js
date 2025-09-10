const express = require("express");
const { register } = require("../controllers/userController.js");

const router = express.Router();

router.post("/signup", register);

module.exports = router;