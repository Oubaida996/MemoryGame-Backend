
const mongoose = require('mongoose');


const questionsSchema = mongoose.Schema({
    question: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

module.exports = mongoose.model('questions', questionsSchema);