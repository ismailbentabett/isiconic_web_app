const mongoose = require('mongoose');
const app = require('../server');
const cors = require('cors')
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});
const Chat = require('../models/chat.model.js');
const consola = require('consola')

// Socket IO
httpServer.listen(4000 , ()=>{
  consola.success('socket is connected')
});

// socket io

io.on('connection', (socket) => {

  console.log('made socket connection', socket.id);

  // Handle chat event
  socket.on('chat', function(data){
    console.log(data)
      io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    console.log(data)
    socket.broadcast.emit('typing', data);
});
});


/* GET ALL CHATS */
module.exports.chatAllGET = async (req, res, next) => {
  Chat.find({
    room: req.params.roomid
  }, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
}

/* GET SINGLE CHAT BY ID */
module.exports.chatGET = async (req, res, next) => {
  Chat.findOne( {room: req.params.roomid}).sort({_id:-1}).then((data)=>{

      res.json(data);
  }).catch(err =>{
    console.log(err)
  })
}

/* SAVE CHAT */
module.exports.chatPOST = async (req, res, next) => {
  Chat.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

/* UPDATE CHAT */
module.exports.chatUPDATE = async (req, res, next) => {
  Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

/* DELETE CHAT */
module.exports.chatDELETE = async (req, res, next) => {
  Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}




