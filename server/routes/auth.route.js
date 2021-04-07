const {
    Router
} = require('express');

const router = Router();
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.signupPOST);
router.post('/login', authController.loginPOST);
router.get('/logout', authController.logoutGET);



module.exports = router;