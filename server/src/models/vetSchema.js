const mongoose = require('mongoose');

const vetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    specialization: { type: String, required: true }, // e.g., "Dermatology"
    experience: { type: Number, required: true }, // in years
    availableSlots: [{
        day: String, // "Monday"
        time: String // "9:00 AM - 5:00 PM"
    }],
    role: { type: String, default: 'vet' },
}, { timestamps: true });

const vetModel = mongoose.model('Vet', vetSchema);

module.exports = vetModel;