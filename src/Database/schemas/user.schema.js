const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_email: { type: String, required: true },
    user_pwd: { type: String, required: true },
    isAdmin: { type: Boolean }
});

module.exports = mongoose.model('users', userSchema);