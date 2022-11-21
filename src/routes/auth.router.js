const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.post('/api/register', authController.register);
router.post('/api/authenticate', authController.authenticate);
router.post('/api/forgot_password', authController.forgot);
router.post('/api/reset_password', authController.reset);

module.exports = router;