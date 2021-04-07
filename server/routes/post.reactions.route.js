const {
    Router
} = require('express');

const router = Router();
const postReactionsController = require('../controllers/post.reactions.controller')

router.put('/like/:postId', postReactionsController.likeUPDATE)
router.put('/dislike/:postId', postReactionsController.dislikeUPDATE)
router.put('/love/:postId', postReactionsController.loveUPDATE)

router.put('/unlike/:postId', postReactionsController.unlikeUPDATE)
router.put('/undislike/:postId', postReactionsController.undislikeUPDATE)
router.put('/unlove/:postId', postReactionsController.unloveUPDATE)
module.exports = router;