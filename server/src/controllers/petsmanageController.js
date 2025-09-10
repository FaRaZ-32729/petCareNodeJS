const petModel = require("../models/petSchema");

const petscreate = async (req, res) => {
    try {
        const { name, species, breed, age, medicalHistory, gallery, ownerId } = req.body;

        // 1. Validate required fields
        if (!name || !species || !breed || !age || !ownerId) {
            return res.status(400).json({
                message: "Name, species, breed, age, and ownerId are required",
                isSaved: false
            });
        }

        // 2. Create new pet
        const newPet = await petModel.create({
            name,
            species,
            breed,
            age,
            medicalHistory: medicalHistory || [],
            gallery: gallery || [],
            ownerId
        });

        // 3. Return success response
        return res.status(201).json({
            message: "Pet created successfully",
            isSaved: true,
            pet: newPet
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: error.message,
            isSaved: false
        });
    }
};


const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, species, breed, age, medicalHistory, gallery } = req.body;

        // find pet and update
        const updatedPet = await petModel.findByIdAndUpdate(
            id,
            { name, species, breed, age, medicalHistory, gallery },
            { new: true, runValidators: true }
        );

        if (!updatedPet) {
            return res.status(404).json({
                message: "Pet not found",
                isUpdated: false
            });
        }

        return res.status(200).json({
            message: "Pet updated successfully",
            isUpdated: true,
            pet: updatedPet
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: error.message,
            isUpdated: false
        });
    }
};

const deletePet = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPet = await petModel.findByIdAndDelete(id);

        if (!deletedPet) {
            return res.status(404).json({
                message: "Pet not found",
                isDeleted: false
            });
        }

        return res.status(200).json({
            message: "Pet deleted successfully",
            isDeleted: true
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: error.message,
            isDeleted: false
        });
    }
};

const getPetsByOwner = async (req, res) => {
    try {
        const id = req.user.id;

        const pets = await petModel.find({ ownerId:id });

        if (!pets || pets.length === 0) {
            return res.status(404).json({
                message: "No pets found for this owner"
            });
        }

        return res.status(200).json({
            message: "Pets fetched successfully",
            count: pets.length,
            pets
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
};


module.exports = { petscreate,updatePet,deletePet ,getPetsByOwner};
