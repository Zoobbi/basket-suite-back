const Team = require('./Team.model');
const errorHandler = require('../../utils/errorHandler');

module.exports.create = async (req, res) => {
    try {
        const team = await new Team({
           name: req.body.name,
           league: req.body.league
        }).save();
        res.status(201).json({
            message: 'New team created'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async (req, res) => {
    try {

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const teams = await Team.find({}).populate('players').populate('league');
        res.status(200).json(teams)
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.patch = async (req, res) => {
    try {

    } catch (e) {
        errorHandler(res, e);
    }
};
