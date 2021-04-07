const {
    Router
} = require('express');

const router = Router();
const postsController = require('../controllers/admin.controller');
const {
    isAdminAuth
} = require('../middlewares/auth.middleware');


router.get('/', isAdminAuth, postsController.postsGET);
router.post('/', isAdminAuth, postsController.postsPOST);
router.delete('/:id', isAdminAuth, postsController.postsDELETE);
router.put('/:id', isAdminAuth, postsController.postsUPDATE);



module.exports = router;