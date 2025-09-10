// controllers/healthRecordController.js
const healthRecordModel = require('../models/healthRecordSchema.js')

// ✅ Create Health Record
const createHealthRecord = async (req, res) => {
    try {
        const { petId, vaccinations, allergies, illnesses, treatments, documents, insurance } = req.body;

        if (!petId) {
            return res.status(400).json({ message: "Pet ID is required" });
        }

        const newRecord = await healthRecordModel.create({
            petId,
            vaccinations,
            allergies,
            illnesses,
            treatments,
            documents,
            insurance
        });

        return res.status(201).json({
            message: "Health record created successfully",
            record: newRecord
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};

// ✅ Update Health Record
const updateHealthRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedRecord = await healthRecordModel.findByIdAndUpdate(
            id,
            { ...updates, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedRecord) {
            return res.status(404).json({ message: "Health record not found" });
        }

        return res.status(200).json({
            message: "Health record updated successfully",
            record: updatedRecord
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};

// ✅ View All Health Records for a Pet
const getHealthRecordsByPet = async (req, res) => {
    try {
        const { petId } = req.params;

        const records = await healthRecordModel.find({ petId }).populate("petId");

        if (!records || records.length === 0) {
            return res.status(404).json({ message: "No health records found for this pet" });
        }

        return res.status(200).json({ records });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};

// ✅ View Single Health Record
const getHealthRecordById = async (req, res) => {
    try {
        const { id } = req.params;

        const record = await healthRecordModel.findById(id).populate("petId");

        if (!record) {
            return res.status(404).json({ message: "Health record not found" });
        }

        return res.status(200).json({ record });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createHealthRecord,
    updateHealthRecord,
    getHealthRecordsByPet,
    getHealthRecordById
};
