const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const isZero = require('../../utils/checkDivisionByZero');

function getPercent(value, total) {
    return (value / total * 100).toFixed();
}

const playerInGame = new Schema({
        _id: {
            type: String,
            default: ''
        },
        team: {
            type: String,
            default: ''
        },
        full: {
            type: String,
            default: ''
        },
        time_in_game: {
            type: String,
            default: 'DNP'
        },
        start: {
          type: Boolean,
          default: false
        },
        number: {
          type: Number,
          default: 0
    },
        stats: {
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

const gameSchema = new Schema({
        league: {
            ref: 'leagues',
            type: Schema.Types.ObjectId,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        team_home: {
            ref: 'teams',
            type: Schema.Types.ObjectId
        },
        team_home_name: {
            type: String,
            default: ' ',
        },
        team_visit: {
            ref: 'teams',
            type: Schema.Types.ObjectId
        },
        team_visit_name: {
            type: String,
            default: ' ',
        },
        score_home: {
            type: Number,
            default: 0
        },
        score_visit: {
            type: Number,
            default: 0
        },
        quarters: {
            type: Array,
            default: [],
        },
        players: [playerInGame],
}, {
     toObject: {
         virtuals: true
        },
     toJSON: {
           virtuals: true
        }
    }
);

playerInGame.virtual('stats.rebound.total').get( function () {
    return this.stats.rebound.defence.total +  this.stats.rebound.offence.total;
})

playerInGame.virtual('stats.rebound.total').get( function () {
    return this.stats.rebound.defence.total +  this.stats.rebound.offence.total;
});

playerInGame.virtual('stats.FT.percent').get( function () {
    if (!isZero( this.stats.FT.total)) {
        return getPercent(this.stats.FT.made, this.stats.FT.total);
    }
    return 0;
});
playerInGame.virtual('stats.two_points.percent').get( function () {
    if (!isZero( this.stats.two_points.total)) {
        return  getPercent ( this.stats.two_points.made,  this.stats.two_points.total);
    }
    return 0;
});
playerInGame.virtual('stats.three_points.percent').get( function () {
    if (!isZero( this.stats.three_points.total)) {
        return  getPercent ( this.stats.three_points.made,  this.stats.three_points.total);
    }
    return 0;
});

playerInGame.virtual('stats.total_shots.total').get( function () {
   return this.stats.two_points.total +  this.stats.three_points.total;
});

playerInGame.virtual('stats.total_shots.made').get( function () {
    return this.stats.two_points.made +  this.stats.three_points.made;
});

playerInGame.virtual('stats.total_shots.percent').get( function () {
    if(!isZero( this.stats.three_points.made) && !isZero( this.stats.three_points.made)) {
        return getPercent(
            ( this.stats.two_points.made +  this.stats.three_points.made),
            ( this.stats.two_points.total +  this.stats.three_points.total)) ;
    }
    return 0;
});


module.exports = mongoose.model('games', gameSchema);
