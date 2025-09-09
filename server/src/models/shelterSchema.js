const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
    shelterName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, default: 'shelter' },
}, { timestamps: true });

const shelterModel = mongoose.model('Shelter', shelterSchema);

module.exports = shelterModel;