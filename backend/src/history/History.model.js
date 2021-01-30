const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true,
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    },
    user_email: {
        type: String,
        default: '',
    }
});

module.exports = mongoose.model('histories', historySchema);
