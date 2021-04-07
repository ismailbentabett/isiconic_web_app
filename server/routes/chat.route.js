const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const chatController = require('../controllers/chat.controller')


/* GET ALL CHATS */
router.get('/:roomid', chatController.chatAllGET);

/* GET SINGLE CHAT BY ID */
router.get('/latest/:roomid', chatController.chatGET);

/* SAVE CHAT */
router.post('/', chatController.chatPOST);

/* UPDATE CHAT */
router.put('/:id', chatController.chatUPDATE);

/* DELETE CHAT */
router.delete('/:id', chatController.chatDELETE);

module.exports = router;