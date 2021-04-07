const {
    Router
} = require('express');

const router = Router();
const postController = require('../controllers/post.controller')

router.get('/', postController.PostsAllGET);

router.get('/:id', postController.userPostsGET);
router.get('/id/:id', postController.postByIdGET);
router.get('/tag/:tag', postController.postByTagGET);

router.post('/:id', postController.userPostsPOST);
router.delete('/:id', postController.userPostsDELETE);
router.put('/:id', postController.userPostsUPDATE);
router.put('/addimage/:id', postController.addImages);

module.exports = router;