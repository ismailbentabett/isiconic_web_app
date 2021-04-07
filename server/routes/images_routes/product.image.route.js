const {
    Router
} = require('express');
const router = Router();
const {

    isAdminAuth
} = require('../../middlewares/auth.middleware');

const productImageController = require('../../controllers/images_upload_controllers/product.image.controller')




//user

router.post('/product/upload/:product_id', productImageController.getProductId, productImageController.upload.array("upload"), productImageController.imageUploadPOST);
router.get('/product/upload', productImageController.imageArrayGET);
router.get('/product/:filename', productImageController.imageGET);
router.get('/product/display/:filename', productImageController.imageDisplayGET);
router.delete('/product/:id', productImageController.imageDELETE);

//admin

router.get('/product/admin/upload/admin', isAdminAuth, productImageController.imageAdminArrayGET);
router.delete('/product/admin/:id', isAdminAuth, productImageController.imageAdminDELETE);
router.get('/product/admin/display/admin/:filename', isAdminAuth, productImageController.imageaAdminDisplayGET);
router.get('/product/admin/:filename', isAdminAuth, productImageController.imageAdminGET);





module.exports = router;