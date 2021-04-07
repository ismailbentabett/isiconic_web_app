const {
    Router
} = require('express');

const router = Router();
const follow_unfollowController = require('../controllers/follow_unfollow.controller')


router.put('/follow/:reciever_id', follow_unfollowController.followUPDATE);
router.put('/unfollow/:reciever_id', follow_unfollowController.unfollowUPDATE);

module.exports = router;