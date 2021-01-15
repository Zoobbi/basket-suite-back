const League = require('./League.model');
const errorHandler = require('../../utils/errorHandler');

module.exports.create = async (req, res) =>{
    try {
        const league = await new League({
            name: req.body.name.trim()
        }).save();
        res.status(201).json({
            message: 'Новая лига создана'
        })
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async (req, res) =>{
    try {

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAll = async (req, res) =>{
    try {
        const leagues = await League.find({});
        res.status(200).json(leagues)
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getLeagueById = async (req, res) =>{
    const {id} = req.params;
    try {
        const league = await League.findById(id);
        //teams by id
        res.status(200).json(league);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.patch = async (req, res) =>{
    try {

    } catch (e) {
        errorHandler(res, e);
    }
};
