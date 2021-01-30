const Team = require('./Team.model');
const errorHandler = require('../../utils/errorHandler');

module.exports.create = async (req, res) => {
    try {
        const team = await new Team({
           name: req.body.name,
           league: req.body.league
        }).save();
        res.status(201).json({
            message: 'Команда создана'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async (req, res) => {
    try {
        const {id} = req.params;
        await Team.deleteOne({ _id: id });
        res.status(200).json({
            message: 'Команда удалена'
        })
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const league_id = req.params.league_id;
        const teams = await Team.find({league: league_id}).populate('players').populate('leagues');
        res.status(200).json(teams)
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    const {id} = req.params;
    try {
        const team = await Team.findById(id)
            .populate('players');
        res.status(200).json(team);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.patch = async (req, res) => {
    const {id} = req.params;
    const data = req.body;

    try {
        const team = await Team.findByIdAndUpdate(id, {...data} );
        res.status(200).json({
            team,
            message:'Команда обновлена'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};
