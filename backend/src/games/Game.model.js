const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    date: {
        type: Date,
        default:Date.now
    },
    team_home: {
        ref: 'teams',
        type: Schema.Types.ObjectId
    },
    team_visit: {
        ref: 'teams',
        type: Schema.Types.ObjectId
    },
    stats: {
        team_home_total_points: {
            type: Number,
            default: 0
        },
        team_visit_total_points: {
            type: Number,
            default: 0
        },
    }
});

module.exports = mongoose.model('games', gameSchema);
