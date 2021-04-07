var mongoose = require('mongoose');
var Room = require('../models/room.model.js');

/* GET ALL ROOMS */
//roomAllGET
module.exports.roomAllGET = async (req, res, next) => {
  Room.find({},function (err, data) {
    if (err) {
      res.json({
        error: err
      })
    };
    res.json(data);
  });
}

/* GET SINGLE ROOM BY ID */
//roomGET
module.exports.roomGET = async (req, res, next) => {
  Room.findById(req.params.id, function (err, room) {
    if (err) {
      res.send(err)
    }
    res.json(room);
  });
}

/* SAVE ROOM */
//roomPOST
module.exports.roomPOST = async (req, res, next) => {
  Room.create(req.body, function (err, post) {
    if (err) {
      res.send(err)
    }
    res.json(post);
  });
}

/* UPDATE ROOM */
//roomUPDATE
module.exports.roomUPDATE = async (req, res, next) => {
  Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      res.send(err)
    }
    res.json(post);
  });
}

/* DELETE ROOM */
//roomDELETE
module.exports.roomDELETE = async (req, res, next) => {
  Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) {
      res.send(err)
    }
    res.json(post);
  });
}