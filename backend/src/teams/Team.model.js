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
    teamColor: {
      type: String,
      default: '#ffffff'
    },
    game: {
        played: {
            type: Number,
            default: 0
        },
        win: {
            type: Number,
            default: 0
        }
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'players',
        default: ''
    }]
}, {
     toObject: {
          virtuals: true
        },
     toJSON: {
          virtuals: true
        }
    }
);

teamSchema.virtual('game.loss').get( function () {
    return this.game.played - this.game.win;
});

module.exports = mongoose.model('teams', teamSchema);
