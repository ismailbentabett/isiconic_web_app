var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Store = require('../models/store.model.js');
const storeController = require('../controllers/store.controller')


router.get('/mystore/:userid',storeController.mystoreGET)
router.get('/', storeController.storeAllGET);

router.get('/:id', storeController.storeGET);

router.post('/', storeController.storePOST);

router.put('/:id', storeController.storeUPDATE);

router.delete('/:id', storeController.storeDELETE);

module.exports = router;