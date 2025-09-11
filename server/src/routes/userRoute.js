const express = require("express");
const { register,  getAllUsers, getUserById, deleteUser } = require("../controllers/userController.js");
const verifyToken = require("../Middlwares/verifytokenMiddleware.js");

const router = express.Router();

router.post("/signup", register);
router.delete('/:id', deleteUser)
router.get("/", getAllUsers);
router.get("/getuser", verifyToken, getUserById);

module.exports = router