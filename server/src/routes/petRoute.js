const express = require("express");
const { petscreate, updatePet, deletePet, getPetsByOwner } = require("../controllers/petController.js");
const verifyToken = require("../Middlwares/verifytokenMiddleware");
const petsrouter = express.Router();

petsrouter.post("/petscreate", verifyToken, petscreate);

petsrouter.put('/petsupdate/:id', verifyToken, updatePet)

petsrouter.delete('/petsdelete/:id', verifyToken, deletePet)

petsrouter.get('/fetchpetsbyowner', verifyToken, getPetsByOwner)

module.exports = petsrouter;
