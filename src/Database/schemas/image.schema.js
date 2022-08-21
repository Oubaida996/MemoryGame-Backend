const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    image_name: { type: String, required: true },

    img: {
        data: { type: Buffer },
        contentType: { type: String }
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    }
});


module.exports = mongoose.model('images', imageSchema);