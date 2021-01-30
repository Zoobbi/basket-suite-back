const mongoose = require('mongoose');
const isZero = require('../../utils/checkDivisionByZero');
const Schema = mongoose.Schema;

function getPercent(value, total) {
    return (value / total * 100).toFixed();
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
            total: {
                type: Number,
                default: 0
            }
        },
        rebound: {
            defence: {
                total: {
                    type: Number,
                    default: 0
                }
            },
            offence: {
                total: {
                    type: Number,
                    default: 0
                }
            }
        },
        assists: {
            total: {
                type: Number,
                default: 0
            }
        },
        steals: {
            total: {
                type: Number,
                default: 0
            }
        },
        blocks: {
            total: {
                type: Number,
                default: 0
            }
        },
        //TODO turnoverS
        turnover: {
            total: {
                type: Number,
                default: 0
            }
        },
        fouls: {
            take: {
                total: {
                    type: Number,
                    default: 0
                }
            },
            give: {
                total: {
                    type: Number,
                    default: 0
                }
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
        },
        zones: {
            paint: {
                total: {
                    type: Number,
                    default: 0
                },
                made: {
                    type: Number,
                    default: 0
                }
            },
            left_two: {
                total: {
                    type: Number,
                    default: 0
                },
                made: {
                    type: Number,
                    default: 0
                }
            },
            right_two: {
                total: {
                    type: Number,
                    default: 0
                },
                made: {
                    type: Number,
                    default: 0
                }
            },
            left_two_45deg: {
                total: {
                    type: Number,
                    default: 0
                },
                made: {
                    type: Number,
                    default: 0
                }
            },
            right_two_45deg: {
                total: {
                    type: Number,
                    default: 0
                },
                made: {
                    type: Number,
                    default: 0
                }
            },
            center_two: {
                total: {
                    type: Number,
                    default: 0
                },
                made: {
                    type: Number,
                    default: 0
                }
            },
            left_three: {
                total: {
                    type: Number,
                    default: 0
                },
                made: {
                    type: Number,
                    default: 0
                }
            },
            right_three: {
                total: {
                    type: Number,
                    default: 0
                },
                made: {
                    type: Number,
                    default: 0
                }
            },
            left_three_45deg: {
                total: {
                    type: Number,
                    default: 0
                },
                made: {
                    type: Number,
                    default: 0
                }
            },
            right_three_45deg: {
                total: {
                    type: Number,
                    default: 0
                },
                made: {
                    type: Number,
                    default: 0
                }
            },
            center_three: {
                total: {
                    type: Number,
                    default: 0
                },
                made: {
                    type: Number,
                    default: 0
                }
            },
        },
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

playerSchema.virtual('stats.rebound.total').get( function () {
    return this.stats.rebound.defence.total + this.stats.rebound.offence.total;
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
            (this.stats.two_points.total + this.stats.three_points.total)) ;
    }
   return 0;
});
playerSchema.virtual('stats.FT.missed').get( function () {
    return getMissShots(this.stats.FT.total, this.stats.FT.made)
});
playerSchema.virtual('stats.two_points.missed').get( function () {
    return getMissShots(this.stats.two_points.total, this.stats.two_points.made)
});
playerSchema.virtual('stats.three_points.missed').get( function () {
    return getMissShots(this.stats.three_points.total, this.stats.three_points.made)
});

playerSchema.virtual('stats.points.per_game').get( function () {
    if (!isZero(this.stats.game_played)) {
        return (this.stats.points.total / this.stats.game_played).toFixed(1);
    }
    return 0;
});

playerSchema.virtual('stats.rebound.defence.per_game').get( function () {
    if (!isZero(this.stats.game_played)) {
        return (this.stats.rebound.defence.total / this.stats.game_played).toFixed(1);
    }
    return 0;
});

playerSchema.virtual('stats.rebound.offence.per_game').get( function () {
    if (!isZero(this.stats.game_played)) {
        return (this.stats.rebound.offence.total / this.stats.game_played).toFixed(1);
    }
    return 0;
});

playerSchema.virtual('stats.rebound.per_game').get( function () {
    if (!isZero(this.stats.game_played)) {
        return ((this.stats.rebound.defence.total + this.stats.rebound.offence.total) / this.stats.game_played).toFixed(1);
    }
    return 0;
});


playerSchema.virtual('stats.assists.per_game').get( function () {
    if (!isZero(this.stats.game_played)) {
        return (this.stats.assists.total / this.stats.game_played).toFixed(1);
    }
    return 0;
});

playerSchema.virtual('stats.steals.per_game').get( function () {
    if (!isZero(this.stats.game_played)) {
        return (this.stats.steals.total / this.stats.game_played).toFixed(1);
    }
    return 0;
});

playerSchema.virtual('stats.blocks.per_game').get( function () {
    if (!isZero(this.stats.game_played)) {
        return (this.stats.blocks.total / this.stats.game_played).toFixed(1);
    }
    return 0;
});

playerSchema.virtual('stats.turnover.per_game').get( function () {
    if (!isZero(this.stats.game_played)) {
        return (this.stats.turnover.total / this.stats.game_played).toFixed(1);
    }
    return 0;
});

playerSchema.virtual('stats.fouls.take.per_game').get( function () {
    if (!isZero(this.stats.game_played)) {
        return (this.stats.fouls.take.total / this.stats.game_played).toFixed(1);
    }
    return 0;
});

playerSchema.virtual('stats.fouls.give.per_game').get( function () {
    if (!isZero(this.stats.game_played)) {
        return (this.stats.fouls.give.total / this.stats.game_played).toFixed(1);
    }
    return 0;
});

playerSchema.virtual('stats.assists.ast_to_to').get(function () {
    if( !isZero(this.stats.turnover.total)) {
        return this.stats.assists.total / this.stats.turnover.total;
    }
    return this.stats.assists.total;
})
playerSchema.virtual('stats.PIR').get(function () {
    return (this.stats.points.total+ this.stats.rebound.defence.total + this.stats.rebound.offence.total
        + this.stats.assists.total + this.stats.steals.total + this.stats.blocks.total +this.stats.fouls.take.total)
        - (getMissShots(this.stats.FT.total, this.stats.FT.made) + getMissShots(this.stats.two_points.total, this.stats.two_points.made)
            + getMissShots(this.stats.three_points.total, this.stats.three_points.made) + this.stats.turnover.total + this.stats.fouls.give.total);
})
module.exports = mongoose.model('players', playerSchema);
