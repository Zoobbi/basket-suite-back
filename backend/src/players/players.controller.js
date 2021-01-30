const Player = require('./Player.model');
const Team = require('../teams/Team.model');
const errorHandler = require('../../utils/errorHandler');

module.exports.create = async (req, res) => {
    try {
        const player = await new Player({
            name:{
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            },
            team: req.body.team,
            number: req.body.number
        }).save();
        const team = await Team.updateOne({ _id: player.team }, { $push: { players: player._id }});
        res.status(201).json({
            message: 'Игрок создан'
        })
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async (req, res) => {
    try {
        const {id} = req.params;
        await Player.deleteOne({ _id: id });
        res.status(200).json({
            message: 'Игрок удален'
        })
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const player = await Player.find({});
        res.status(200).json(player)
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const player = await Player.findOne({
            _id: req.params.id
        }).populate('team');
        res.status(200).json(player);

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.patch = async (req, res) => {
    const {id} = req.params;
    const data = req.body;

    try {
        const player = await Player.findByIdAndUpdate(id, {...data} );
        res.status(200).json({
            player,
            message:'Игрок обновлен'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};
