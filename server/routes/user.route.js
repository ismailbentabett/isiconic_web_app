const {
    Router
} = require('express');

const router = Router();

const userController = require('../controllers/user.controller');

//GET USER BY ID
router.get('/:id', userController.getUserByIdGET)

//GET ALL USERS

router.get('/', userController.getAllUsersGET)


//UPDATE USER
router.put('/:id', userController.updateUserUPDATE)


//DELETE USER 

router.delete('/:id', userController.deleteUserDELETE)





router.put('/addStore/:userId' ,userController.addStoreUPDATE )








module.exports = router;