const express = require('express');
const router = express.Router();
const controller = require('./players.controller');

router.post('/add',controller.create);
router.delete('/:id',controller.remove);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.patch('/:id', controller.patch);

module.exports = router;
