const {
    Router
} = require('express');

const router = Router();
const postCommentsController = require('../controllers/post.comments.controller')

router.get('/:postId', postCommentsController.commentGET)

router.post('/post', postCommentsController.commentPOST);

router.put('/:id', postCommentsController.commentPUT)
router.put('/addreply/:parentCommentId', postCommentsController. addRepliesPUT)

router.delete('/:id', postCommentsController.commentDELETE)
module.exports = router;