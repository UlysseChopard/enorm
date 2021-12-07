const mongoose = require("mongoose");


const expertSchema = mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: true },
    imageUrl: { type: String, required: false },
    dateOfRecording: { type: Date, required: true },
    isActive: { type: Boolean, required: true },
    workingCommittees: [{ type: String, required: false }]
});

module.exports = mongoose.model("expert", expertSchema);