const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

const statusController = require('../controllers/status.controller');

router.get('/api/status', checkAuth, statusController.status);

module.exports = router;