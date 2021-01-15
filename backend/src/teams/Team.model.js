const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    league: {
        ref: 'leagues',
        type: Schema.Types.ObjectId,
        required: true
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'players',
        default: ''
    }]
});

module.exports = mongoose.model('teams', teamSchema);
