// routes/healthRecordRoutes.js
const express = require("express");
const verifyToken = require("../Middlwares/verifytokenMiddleware");
const { createHealthRecord, updateHealthRecord, getHealthRecordById } = require("../controllers/healthRecordController");
const healthrecordRouter = express.Router();


// Create new health record (protected)
healthrecordRouter.post("/createhealthrecord", verifyToken, createHealthRecord);

// Update existing health record (protected)
healthrecordRouter.put("/updatehealthrecord/:id", verifyToken, updateHealthRecord);

// Get all health records for a pet
healthrecordRouter.get("/gethealthrecord/:petId", verifyToken, getHealthRecordById);



module.exports = healthrecordRouter;
