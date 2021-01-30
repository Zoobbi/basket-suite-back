const express = require('express');
const router = express.Router();
const controller = require('./leagues.controller');

router.post('/',controller.create);
router.delete('/:id',controller.remove);
router.get('/', controller.getAll);
router.get('/:id', controller.getLeagueById);
router.patch('/:id', controller.patch);

module.exports = router;
