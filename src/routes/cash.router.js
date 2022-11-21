const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

const cashController = require('../controllers/cash.controller');

router.get('/api/cash', checkAuth, cashController.cashGet);
router.get('/api/cash/:id', checkAuth, cashController.cashGetId);
router.post('/api/cash', checkAuth, cashController.cashPost);
router.put('/api/cash/:id', checkAuth, cashController.cashPatchId);
router.delete('/api/cash/:id', checkAuth, cashController.cashDeleteId);

module.exports = router;