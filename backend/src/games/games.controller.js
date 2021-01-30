const Game = require('./Game.model');
const errorHandler = require('../../utils/errorHandler');

module.exports.create = async (req, res) => {
    try {
        const game = await new Game({
           league: req.body.league,
           team_home: req.body.team_home,
           team_home_name: req.body.team_home_name,
           team_visit_name: req.body.team_visit_name,
           team_visit: req.body.team_visit,
           score_home: req.body.score_home,
           score_visit: req.body.score_visit,
           start: req.body.start,
           number: req.body.number,
           quarters: req.body.quarters,
           players: req.body.players,
        }).save();
        res.status(201).json({
            message: 'Cтатистика записана'
        })
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async (req, res) =>{
    try {
        const {id} = req.params;
        await Game.deleteOne({ _id: id });
        res.status(200).json({
            message: 'Игра удалена'
        })
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getByGameId = async (req, res) => {
    const {id} = req.params;
    try {
        const game = await Game.findById(id);
        res.status(200).json(game);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const league_id = req.params.league_id;
        const game = await Game.find({league: league_id})
            .select({
                league:1,
                team_home:1,
                team_home_name:1,
                team_visit:1,
                team_visit_name:1,
                score_home:1,
                score_visit:1,
                date:1,
            });
        res.status(200).json(game)
    } catch (e) {
        errorHandler(res, e);
    }
};
