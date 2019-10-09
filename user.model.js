const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    userType: String,
    projects: Array,
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);