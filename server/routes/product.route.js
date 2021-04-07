const {
    Router
} = require('express');

const router = Router();
const productController = require('../controllers/product.controller')

router.get('/', productController.ProductsAllGET);
router.get('/getproduc/:id', productController.getOneProductGET);

router.get('/user/:user_id', productController.userProductsGET);
router.get('/store/:store_id', productController.storeProductsGET);

router.post('/:store_id', productController.userProductsPOST);
router.delete('/:id', productController.userProductsDELETE);
router.put('/:id', productController.userProductsUPDATE);
router.put('/addimage/:id', productController.addImages);


module.exports = router;