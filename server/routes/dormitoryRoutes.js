const express = require('express');
const router = express.Router();
const dormitoryController = require('../controllers/dormitoryController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
// Tenant middleware is applied in index.js
router.use(protect);

router.post('/', dormitoryController.createDormitory);
router.get('/', dormitoryController.getDormitories);
router.delete('/:id', dormitoryController.deleteDormitory);

router.post('/room', dormitoryController.createRoom);
router.get('/room', dormitoryController.getRooms);
router.delete('/room/:id', dormitoryController.deleteRoom);

module.exports = router;
