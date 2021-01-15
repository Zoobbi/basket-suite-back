const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
       type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('users', schema);
