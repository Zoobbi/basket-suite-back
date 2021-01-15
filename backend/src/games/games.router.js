const express = require('express');
const router = express.Router();
const pasport = require('passport');
const controller = require('./games.controller');

router.post('/', pasport.authenticate('jwt', {session: false}), controller.create);
router.delete('/:id',controller.remove);
router.get('/', controller.getAll);
router.get('/:gameId', controller.getByGameId);

module.exports = router;
