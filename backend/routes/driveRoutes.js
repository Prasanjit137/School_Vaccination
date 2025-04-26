const express = require('express');
const router = express.Router();
const { createDrive, getDrives, updateDrive, deleteDrive } = require('../controllers/driveController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, createDrive);
router.get('/', authenticateToken, getDrives);
router.put('/:id', authenticateToken, updateDrive);
router.delete('/:id', authenticateToken, deleteDrive);

module.exports = router;