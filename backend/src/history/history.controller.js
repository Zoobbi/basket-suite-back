const History= require('./History.model');
const errorHandler = require('../../utils/errorHandler');

module.exports.create = async (req, res) =>{
    try {
        const history = await new History({
            text: req.body.text.trim(),
            user: req.body.user,
            user_email: req.body.user_email,
        }).save();
        res.status(201).json({
            message: 'история записана'
        })
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAll = async (req, res) =>{
    try {
        const history = await History.find({}).sort({date: -1});
        res.status(200).json(history)
    } catch (e) {
        errorHandler(res, e);
    }
};
