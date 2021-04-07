const {
    Router
} = require('express');
const router = Router();
const {


    isAdminAuth
} = require('../../middlewares/auth.middleware');

const storeImageController = require('../../controllers/images_upload_controllers/store.image.controller')




//user

router.post('/store/upload/:store_id', storeImageController.getStoretId, storeImageController.upload.single("upload"), storeImageController.imageUploadPOST);
router.get('/store/upload/:store_id', storeImageController.imageArrayGET);
router.get('/store/:filename', storeImageController.imageGET);
router.get('/store/display/:filename', storeImageController.imageDisplayGET);
router.delete('/store/:id', storeImageController.imageDELETE);

//admin

router.get('/store/admin/upload/admin', isAdminAuth, storeImageController.imageAdminArrayGET);
router.delete('/store/admin/:id', isAdminAuth, storeImageController.imageAdminDELETE);
router.get('/store/admin/display/admin/:filename', isAdminAuth, storeImageController.imageaAdminDisplayGET);
router.get('/store/admin/:filename', isAdminAuth, storeImageController.imageAdminGET);





module.exports = router;