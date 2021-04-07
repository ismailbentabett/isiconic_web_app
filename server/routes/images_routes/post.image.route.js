const {
    Router
} = require('express');
const router = Router();
const {

    isAdminAuth
} = require('../../middlewares/auth.middleware');

const postImageController = require('../../controllers/images_upload_controllers/post.image.controller')




//user

router.post('/post/upload/:post_id', postImageController.getPostId, postImageController.upload.array("upload"), postImageController.imageUploadPOST);
router.get('/post/upload/:post_id', postImageController.imageArrayGET);
router.get('/post/:filename', postImageController.imageGET);
router.get('/post/display/:filename', postImageController.imageDisplayGET);
router.delete('/post/:postId', postImageController.imageDELETE);

//admin

router.get('/post/admin/upload/admin', isAdminAuth, postImageController.imageAdminArrayGET);
router.delete('/post/admin/:id', isAdminAuth, postImageController.imageAdminDELETE);
router.get('/post/admin/display/admin/:filename', isAdminAuth, postImageController.imageaAdminDisplayGET);
router.get('/post/admin/:filename', isAdminAuth, postImageController.imageAdminGET);





module.exports = router;