const {
    Router
} = require('express');
const router = Router();
const {

    isAdminAuth
} = require('../../middlewares/auth.middleware');

const userImageController = require('../../controllers/images_upload_controllers/user.image.controller')




//user

router.post('/user/upload', userImageController.upload.single("upload"), userImageController.imageUploadPOST);
router.get('/user/upload', userImageController.imageArrayGET);
router.get('/user/:filename', userImageController.imageGET);
router.get('/user/display/:filename', userImageController.imageDisplayGET);
router.delete('/user/:id', userImageController.imageDELETE);

//admin

router.get('/user/admin/upload/admin', isAdminAuth, userImageController.imageAdminArrayGET);
router.delete('/user/admin/:id', isAdminAuth, userImageController.imageAdminDELETE);
router.get('/user/admin/display/admin/:filename', isAdminAuth, userImageController.imageaAdminDisplayGET);
router.get('/user/admin/:filename', isAdminAuth, userImageController.imageAdminGET);





module.exports = router;