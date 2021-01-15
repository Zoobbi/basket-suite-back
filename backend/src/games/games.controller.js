const Game = require('./Game.model');
const errorHandler = require('../../utils/errorHandler');

module.exports.create = async (req, res) => {
    try {

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

module.exports.getByGameId = async (req, res) => {
    try {
        const game = await Game.find({
           _id: req.params.gameId
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAll = async (req, res) => {
    try {

    } catch (e) {
        errorHandler(res, e);
    }
};


