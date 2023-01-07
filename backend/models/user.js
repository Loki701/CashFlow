const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    passwordHash: {
        type: String,
        required: true
    }
});


exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;