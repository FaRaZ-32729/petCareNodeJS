const express = require("express");
const { register, deleteuser } = require("../controllers/userController.js");

const router = express.Router();

router.post("/signup", register);
router.delete('/userdelete',deleteuser)

module.exports = router;