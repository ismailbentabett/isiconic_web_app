const {
    Router
} = require('express');
const router = Router();
const {

    isAdminAuth
} = require('../../middlewares/auth.middleware');

const storyImageController = require('../../controllers/images_upload_controllers/story.image.controller')




//user

router.post('/story/upload',  storyImageController.upload.single("upload"), storyImageController.imageUploadPOST);
router.get('/story/upload', storyImageController.imageArrayGET);
router.get('/story/:filename', storyImageController.imageGET);
router.get('/story/display/:filename', storyImageController.imageDisplayGET);
router.delete('/story/:postId', storyImageController.imageDELETE);

//admin

router.get('/story/admin/upload/admin', isAdminAuth, storyImageController.imageAdminArrayGET);
router.delete('/story/admin/:id', isAdminAuth, storyImageController.imageAdminDELETE);
router.get('/story/admin/display/admin/:filename', isAdminAuth, storyImageController.imageaAdminDisplayGET);
router.get('/story/admin/:filename', isAdminAuth, storyImageController.imageAdminGET);





module.exports = router;