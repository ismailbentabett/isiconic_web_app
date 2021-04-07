var mongoose = require('mongoose');
var Store = require('../models/store.model.js');

/* GET ALL StoreS */
//StoreAllGET
module.exports.storeAllGET = async (req, res, next) => {
  Store.find(function (err, stores) {
    if (err) {
      res.json({
        error: err
      })
    };
    res.json(stores);
  });
}

/* GET SINGLE Store BY ID */
//StoreGET
module.exports.storeGET = async (req, res, next) => {
  Store.findById(req.params.id, function (err, post) {
    if (err) {
      res.send(err)
    }
    res.json(post);
  });
}

/* SAVE Store */
//StorePOST
module.exports.storePOST = async (req, res, next) => {
  const userId = req.userData._id;
  const {
    name,
    description
  } = req.body
  Store.create({
    name,
    description,
    userId
  }, function (err, post) {
    if (err) {
      res.send(err)
    }
    res.json(post);
  });
}

/* UPDATE Store */
//StoreUPDATE
module.exports.storeUPDATE = async (req, res, next) => {
  Store.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      res.send(err)
    }
    res.json(post);
  });
}

/* DELETE Store */
//StoreDELETE
module.exports.storeDELETE = async (req, res, next) => {
  Store.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) {
      res.send(err)
    }
    res.json(post);
  });
}


module.exports.mystoreGET = async (req, res, next) =>{
  let userid = req.params.userid
  Store.find({userId:userid} , (err ,data)=>{
    if (err) {
      res.send(err)
    }
    res.json(data);
  })
}