const {
    Router
} = require('express');

const router = Router();
const storyController = require('../controllers/story.controller')

router.get('/', storyController.storyAllGET);

router.get('/:id', storyController.userstoryGET);
router.post('/:id', storyController.userstoryPOST);
router.delete('/:id', storyController.userstoryDELETE);
router.put('/:id', storyController.userstoryUPDATE);
router.put('/addimage/:id', storyController.addImages);

module.exports = router;