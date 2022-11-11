const express = require('express');
const router = express.Router();
const BinController = require('../app/controllers/BinController');

router.get('/', BinController.show);

module.exports = router;

