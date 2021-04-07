const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const cartController = require('../controllers/cart.controller');


router.get('/:user_id',cartController.cartGET)
router.post('/:user_id',cartController.createCartPOST)

router.put('/:user_id',cartController.addToCartUPDATE)
router.put('/product/:user_id',cartController.deleteProductUPDATE)

router.put('/update/:user_id/:product_id',cartController.updateCartProduct)

module.exports = router;