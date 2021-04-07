var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Room = require('../models/room.model.js');
const roomController = require('../controllers/room.controller')
/* GET ALL ROOMS */
router.get('/', roomController.roomAllGET);

/* GET SINGLE ROOM BY ID */
router.get('/:id', roomController.roomGET);

/* SAVE ROOM */
router.post('/', roomController.roomPOST);

/* UPDATE ROOM */
router.put('/:id', roomController.roomUPDATE);

/* DELETE ROOM */
router.delete('/:id', roomController.roomDELETE);

module.exports = router;