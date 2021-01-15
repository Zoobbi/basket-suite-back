const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./User');
const keys = require('../../config/keys');
const errorHandler = require('../../utils/errorHandler');

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password.toString(), candidate.password);

        if (passwordResult) {
            const tokenExpiresSec = 60 * 60 * 24;
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: tokenExpiresSec});

            await User.updateOne({email: req.body.email}, { $set: {lastSeen: Date.now()}});
            res.status(200).json({
                user: candidate,
                token: `Bearer ${token}`
            })
        } else {
            res.status(404).json({
               message: 'Пароли не совпадают'
            });
        }
    } else {
        res.status(404).json({
            message: 'Пользователь не найден'
        })
    }
};

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        res.status(409).json({
            message: 'Такой email уже занят'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const pass = req.body.password.toString();
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(pass, salt)
        });

        try {
           await user.save();
             res.status(201).json({
                 message: `Пользователь с именем: ${user.name} создан`,
                 user: user
           })
         } catch (e) {
            errorHandler(res, e);
         }
    }
};
