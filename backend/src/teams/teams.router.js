const express = require('express');
const router = express.Router();
const controller = require('./teams.controller');

router.post('/',controller.create);
router.delete('/:id',controller.remove);
router.get('/all/:league_id', controller.getAll);
router.get('/:id', controller.getById);
router.patch('/:id', controller.patch);

module.exports = router;
