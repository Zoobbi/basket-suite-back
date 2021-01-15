const mongoose = require('mongoose');
const isZero = require('../../utils/checkDivisionByZero');
const Schema = mongoose.Schema;

function getPercent(value, total) {
    return value / total * 100;
}
function getMissShots(totalShots, madeShots) {
    return totalShots - madeShots;
}

const playerSchema = new Schema({
    name: {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        }
    },
    team: {
        ref: 'teams',
        type: Schema.Types.ObjectId
    },
    number: {
        type: Number,
        default: 0
    },
    stats: {
        game_played: {
            type: Number,
            default: 0
        },
        game_started: {
            type: Number,
            default: 0
        },
        points: {
            type: Number,
            default: 0
        },
        rebound: {
            defence: {
            type: Number,
            default: 0
            },
            offence: {
            type: Number,
            default: 0
            }
        },
        assists: {
            type: Number,
            default: 0
        },
        steals: {
            type: Number,
            default: 0
        },
        block: {
            type: Number,
            default: 0
        },
        turnover: {
            type: Number,
            default: 0
        },
        fouls: {
            take: {
            type: Number,
            default: 0
            },
            give: {
            type: Number,
            default: 0
            }
        },
        FT: {
            total: {
                type: Number,
                default: 0
            },
            made: {
                type: Number,
                default: 0
            }
        },
        two_points: {
            total: {
                type: Number,
                default: 0
            },
            made: {
                type: Number,
                default: 0
            }
        },
        three_points: {
            total: {
                type: Number,
                default: 0
            },
            made: {
                type: Number,
                default: 0
            }
        }
    },
}, {
    toObject: {
        virtuals: true
        },
    toJSON: {
        virtuals: true
        }
    }
);

playerSchema.virtual('name.full').get( function () {
    return this.name.first_name + ' ' + this.name.last_name;
});
playerSchema.virtual('stats.FT.percent').get( function () {
    if (!isZero(this.stats.FT.total)) {
        return  getPercent (this.stats.FT.made, this.stats.FT.total);
    }
    return 0;
});
playerSchema.virtual('stats.two_points.percent').get( function () {
    if (!isZero(this.stats.two_points.total)) {
        return  getPercent (this.stats.two_points.made, this.stats.two_points.total);
    }
    return 0;
});
playerSchema.virtual('stats.three_points.percent').get( function () {
    if (!isZero(this.stats.three_points.total)) {
        return  getPercent (this.stats.three_points.made, this.stats.three_points.total);
    }
    return 0;
});
playerSchema.virtual('stats.total.percent').get( function () {
    if(!isZero(this.stats.three_points.made) && !isZero(this.stats.three_points.made)) {
        return getPercent(
            (this.stats.two_points.made + this.stats.three_points.made),
            (this.stats.two_points.made + this.stats.three_points.made)) ;
    }
   return 0;
});
playerSchema.virtual('stats.FT.missed').get( function () {
    return getMissShots(this.stats.FT.total, this.stats.FT.made)
});
playerSchema.virtual('stats.two_points.missed').get( function () {
    return getMissShots(this.stats.FT.total, this.stats.FT.made)
});
playerSchema.virtual('stats.three_points.missed').get( function () {
    return getMissShots(this.stats.FT.total, this.stats.FT.made)
});

module.exports = mongoose.model('players', playerSchema);
