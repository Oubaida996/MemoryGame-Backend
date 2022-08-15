const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    image_name: { type: String, required: true },
    img: {
        data: { type: Buffer },
        contentType: { type: String }
    }
});


module.exports = mongoose.model('images', imageSchema);